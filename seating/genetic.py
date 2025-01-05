import random
from copy import deepcopy
from typing import List, Dict
from utils import randomly_assign_people_to_tables, calculate_total_score, swap_people

class GeneticTableAssignment:
    def __init__(
        self,
        people: List[str],
        groups: Dict[str, List[str]],
        weights: Dict[str, int],
        tables: List[int],
        population_size: int = 50,
        elite_size: int = 5,
        mutation_rate: float = 0.05
    ):
        self.people = people
        self.groups = groups
        self.weights = weights
        self.tables = tables
        self.population_size = population_size
        self.elite_size = elite_size
        self.mutation_rate = mutation_rate
        
    def create_initial_population(self) -> List[List[List[str]]]:
        return [
            randomly_assign_people_to_tables(self.people, self.tables)
            for _ in range(self.population_size)
        ]
    
    def fitness(self, solution: List[List[str]]) -> float:
        return calculate_total_score(solution, self.groups, self.weights)
    
    def select_parents(self, population: List[List[List[str]]]) -> List[List[List[str]]]:
        fitness_scores = [(solution, self.fitness(solution)) for solution in population]
        sorted_population = sorted(fitness_scores, key=lambda x: x[1], reverse=True)
        
        elite = [solution for solution, _ in sorted_population[:self.elite_size]]
        
        selected = elite.copy()
        while len(selected) < self.population_size:
            tournament_size = 3
            tournament = random.sample(population, tournament_size)
            tournament_fitness = [(sol, self.fitness(sol)) for sol in tournament]
            winner = max(tournament_fitness, key=lambda x: x[1])[0]
            selected.append(winner)
            
        return selected
    
    def crossover(self, parent1: List[List[str]], parent2: List[List[str]]) -> List[List[str]]:
        child = [[] for _ in self.tables]
        used_people = set()
        
        for i in range(len(self.tables)):
            if random.random() < 0.5 and len(parent1[i]) <= self.tables[i]:
                child[i] = parent1[i].copy()
                used_people.update(parent1[i])
        
        for i in range(len(self.tables)):
            if not child[i] and len(parent2[i]) <= self.tables[i]:
                potential_people = [p for p in parent2[i] if p not in used_people]
                if len(potential_people) <= self.tables[i]:
                    child[i] = potential_people
                    used_people.update(potential_people)
        
        remaining_people = [p for p in self.people if p not in used_people]
        for person in remaining_people:
            for i in range(len(self.tables)):
                if len(child[i]) < self.tables[i]:
                    child[i].append(person)
                    break
        
        return child
    
    def mutate(self, solution: List[List[str]]) -> List[List[str]]:
        mutated = [table.copy() for table in solution]
        
        for _ in range(int(len(self.people) * self.mutation_rate)):
            table1_idx = random.randint(0, len(self.tables) - 1)
            table2_idx = random.randint(0, len(self.tables) - 1)
            while table1_idx == table2_idx:
                table2_idx = random.randint(0, len(self.tables) - 1)
                
            person1 = random.choice(mutated[table1_idx])
            person2 = random.choice(mutated[table2_idx])
            swap_people(mutated, table1_idx, person1, table2_idx, person2)
    
        return mutated
    
    def evolve(self, generations: int) -> List[List[str]]:
        population = self.create_initial_population()
        best_solution = None
        best_fitness = float('-inf')
        
        for _ in range(generations):
            parents = self.select_parents(population)
            new_population = []
            new_population.extend(parents[:self.elite_size]) 
            
            while len(new_population) < self.population_size:
                parent1, parent2 = random.sample(parents, 2)
                child = self.crossover(parent1, parent2)
                child = self.mutate(child)
                new_population.append(child)
            
            population = new_population
            current_best = max(population, key=self.fitness)
            current_best_fitness = self.fitness(current_best)
            
            if current_best_fitness > best_fitness:
                best_solution = deepcopy(current_best)
                best_fitness = current_best_fitness
        
        return best_solution

def genetic_algorithm_table_assignment(
    people: List[str],
    groups: Dict[str, List[str]],
    weights: Dict[str, int],
    tables: List[int],
    num_runs: int = 3,
    generations: int = 60
) -> List[List[str]]:
    best_solution = None
    best_score = float('-inf')
    
    for _ in range(num_runs):
        ga = GeneticTableAssignment(people, groups, weights, tables)
        solution = ga.evolve(generations)
        score = calculate_total_score(solution, groups, weights)
        
        if score > best_score:
            best_solution = solution
            best_score = score
    
    return best_solution