from local_search import iteratively_improve_assignment
from utils import calculate_total_score, randomly_assign_people_to_tables
from greedy import greedily_assign_people_to_tables
from annealing import optimize_table_assignment
from genetic import genetic_algorithm_table_assignment
from high_var_sample import people, tables, groups, weights

random_result = randomly_assign_people_to_tables(people, tables)
random_score = calculate_total_score(random_result, groups, weights)
print("random:", random_score)

improved_assignment, num_improvements = iteratively_improve_assignment(random_result, groups, weights)
final_score = calculate_total_score(improved_assignment, groups, weights)
print(f"local search: {final_score} after {num_improvements} improvements")

initial_result = greedily_assign_people_to_tables(people, groups, weights, tables)
initial_score = calculate_total_score(initial_result, groups, weights)
print("greedy:", initial_score)

improved_assignment, num_improvements = iteratively_improve_assignment(initial_result, groups, weights)
final_score = calculate_total_score(improved_assignment, groups, weights)
print(f"greedy + local search: {final_score} after {num_improvements} improvements")

solution = optimize_table_assignment(people, groups, weights, tables)
print("annealing:",  calculate_total_score(solution, groups, weights))

sol = genetic_algorithm_table_assignment(people, groups, weights, tables)
print("genetic:", calculate_total_score(sol, groups, weights))
