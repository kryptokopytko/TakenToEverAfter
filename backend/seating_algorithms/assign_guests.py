from .utils import calculate_total_score
from .greedy import greedily_assign_people_to_tables
from .annealing import optimize_table_assignment

def assign(people, groups, weights, tables_with_ids):
    tables_seats = [table.seats for table in tables_with_ids]
    tables_ids = [table.id for table in tables_with_ids]
    greedy_result = greedily_assign_people_to_tables(people, groups, weights, tables_seats)
    greedy_score = calculate_total_score(greedy_result, groups, weights)

    annealing_result = optimize_table_assignment(people, groups, weights, tables_seats)
    annealing_score = calculate_total_score(annealing_result, groups, weights)

    result = annealing_result
    if greedy_score > annealing_score:
        result = greedy_result
    
    result_map = []
    for table_index, table in enumerate(result):
        for seat_index, person in enumerate(table, start=1):
            result_map.append({person, tables_ids[table_index], seat_index})

    return result_map
