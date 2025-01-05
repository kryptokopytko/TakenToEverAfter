import math
import random
from typing import List, Dict, Tuple
from utils import randomly_assign_people_to_tables, calculate_total_score, swap_people

def generate_new_solution(current_solution: List[List[str]], tables: List[int]) -> List[List[str]]:
    new_solution = [table.copy() for table in current_solution]
    table1_idx, table2_idx = select_two_tables(tables, new_solution)
    person1 = random.choice(new_solution[table1_idx])
    person2 = random.choice(new_solution[table2_idx])
    swap_people(new_solution, table1_idx, person1, table2_idx, person2)
    return new_solution

def select_two_tables(tables: List[int], solution: List[List[str]]) -> Tuple[int, int]:
    table1_idx = random.randint(0, len(tables) - 1)
    table2_idx = random.randint(0, len(tables) - 1)
    
    while table1_idx == table2_idx or len(solution[table1_idx]) == 0 or len(solution[table2_idx]) == 0:
        table1_idx = random.randint(0, len(tables) - 1)
        table2_idx = random.randint(0, len(tables) - 1)
    
    return table1_idx, table2_idx

def accept_new_solution(
    current_score: float,
    new_score: float,
    temperature: float
) -> bool:
    score_diff = new_score - current_score
    return score_diff > 0 or random.random() < math.exp(score_diff / temperature)

def update_best_solution(
    current_solution: List[List[str]],
    current_score: float,
    best_solution: List[List[str]],
    best_score: float
) -> Tuple[List[List[str]], float]:
    if current_score > best_score:
        best_solution = [table.copy() for table in current_solution]
        best_score = current_score
    return best_solution, best_score

def simulated_annealing_table_assignment(
    people: List[str],
    groups: Dict[str, List[str]],
    weights: Dict[str, int],
    tables: List[int],
    cooling_rate: float, 
    initial_temperature: float = 100.0,
    min_temperature: float = 0.01,
    iterations_per_temperature: int = 100
) -> List[List[str]]:
    current_solution = randomly_assign_people_to_tables(people, tables)
    current_score = calculate_total_score(current_solution, groups, weights)
    best_solution = [table.copy() for table in current_solution]
    best_score = current_score
    
    temperature = initial_temperature
    
    while temperature > min_temperature:
        for _ in range(iterations_per_temperature):
            new_solution = generate_new_solution(current_solution, tables)
            new_score = calculate_total_score(new_solution, groups, weights)
            
            if accept_new_solution(current_score, new_score, temperature):
                current_solution = new_solution
                current_score = new_score
                best_solution, best_score = update_best_solution(current_solution, current_score, best_solution, best_score)
            
        temperature *= cooling_rate
    
    return best_solution

def optimize_table_assignment(
    people: List[str],
    groups: Dict[str, List[str]],
    weights: Dict[str, int],
    tables: List[int],
    num_runs: int = 3,
    cooling_rate: float = 0.93, 
    
) -> List[List[str]]:
    """Run simulated annealing multiple times and return the best solution."""
    best_solution = None
    best_score = float('-inf')
    
    for _ in range(num_runs):
        current_solution = simulated_annealing_table_assignment(people, groups, weights, tables, cooling_rate, iterations_per_temperature=100)
        current_score = calculate_total_score(current_solution, groups, weights)
        
        if current_score > best_score:
            best_solution = current_solution
            best_score = current_score
    
    return best_solution