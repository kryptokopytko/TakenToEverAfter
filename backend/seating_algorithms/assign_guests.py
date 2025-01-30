from .utils import calculate_total_score
from .greedy import greedily_assign_people_to_tables
from .annealing import optimize_table_assignment

def assign(people, groups, weights, tables_with_ids, fast_algorithm=False):

    data_to_write = {
        'people': people,
        'groups': groups,
        'weights': weights,
        'tables_with_ids': tables_with_ids,
        'fast_algorithm': fast_algorithm
    }
    
    # Zapisanie danych do pliku data.txt
    with open("data.txt", "w") as file:
        for key, value in data_to_write.items():
            file.write(f"{key}: {value}\n")
            

    tables_seats = [table["seats"] for table in tables_with_ids]
    tables_ids = [table["id"] for table in tables_with_ids]

    greedy_result = greedily_assign_people_to_tables(people, groups, weights, tables_seats)
    result = greedy_result

    if not fast_algorithm:
        greedy_score = calculate_total_score(greedy_result, groups, weights)
        annealing_result = optimize_table_assignment(people, groups, weights, tables_seats)
        annealing_score = calculate_total_score(annealing_result, groups, weights)

        if greedy_score < annealing_score:
            result = annealing_score
    
    result_map = []
    for table_index, table in enumerate(result):
        for seat_index, person in enumerate(table, start=1):
            result_map.append([person, tables_ids[table_index], seat_index])

    return result_map
