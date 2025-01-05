import random
from typing import List, Dict

def calculate_distance(pos1: int, pos2: int, table_size: int) -> int:
    forward = (pos2 - pos1) % table_size
    backward = (pos1 - pos2) % table_size
    return min(forward, backward)

def calculate_base_pair_score(person1: str, person2: str, groups: Dict[str, List[str]], 
                        weights: Dict[str, int]) -> int:
    return sum(weights[group] for group, members in groups.items() 
              if person1 in members and person2 in members)

def calculate_positioned_pair_score(person1: str, pos1: int, person2: str, pos2: int,
                                  table_size: int, groups: Dict[str, List[str]], 
                                  weights: Dict[str, int]) -> float:
    base_score = calculate_base_pair_score(person1, person2, groups, weights)
    if base_score == 0:
        return 0
    distance = calculate_distance(pos1, pos2, table_size)
    return base_score / distance if distance > 0 else 0

def calculate_table_score(table: List[str], groups: Dict[str, List[str]], 
                         weights: Dict[str, int]) -> float:
    table_size = len(table)
    total_score = 0.0
    
    for i, person1 in enumerate(table):
        for j, person2 in enumerate(table):
            if i != j:
                score = calculate_positioned_pair_score(
                    person1, i, person2, j, table_size, groups, weights
                )
                total_score += score
                
    return total_score / 2

def calculate_total_score(assignment: List[List[str]], groups: Dict[str, List[str]], 
                         weights: Dict[str, int]) -> float:
    return sum(calculate_table_score(table, groups, weights) for table in assignment)

def swap_people(assignment: List[List[str]], table1_idx: int, person1: str, 
                table2_idx: int, person2: str) -> None:
    table1 = assignment[table1_idx]
    table2 = assignment[table2_idx]
    
    table1.remove(person1)
    table2.remove(person2)
    table1.append(person2)
    table2.append(person1)


def randomly_assign_people_to_tables(people: List[str], tables: List[int]) -> List[List[str]]:
    shuffled_people = iter(random.sample(people, len(people))) 
    
    assignment = [
        [next(shuffled_people) for _ in range(capacity)]  
        for capacity in tables
    ]
    return assignment