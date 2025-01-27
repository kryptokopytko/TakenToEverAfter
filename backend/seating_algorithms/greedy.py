from typing import List, Dict, Tuple
from itertools import combinations
from .utils import calculate_base_pair_score

def calculate_base_pair_scores(people: List[str], groups: Dict[str, List[str]], 
                         weights: Dict[str, int]) -> Dict[Tuple[str, str], int]:
    """Calculate base scores for all possible pairs of people."""
    return {
        tuple(sorted([p1, p2])): calculate_base_pair_score(p1, p2, groups, weights)
        for p1, p2 in combinations(people, 2)
    }

def greedily_assign_people_to_tables(people: List[str], groups: Dict[str, List[str]], 
                                     weights: Dict[str, int], tables: List[int]) -> List[List[str]]:
    """Assigns people to tables using a greedy approach that prioritizes pairs with higher scores."""
    pair_scores = calculate_base_pair_scores(people, groups, weights)
    sorted_pairs = sorted(pair_scores.items(), key=lambda x: x[1], reverse=True)
    
    assignment = [[] for _ in tables]
    remaining_capacity = tables.copy()
    used_people: Dict[str, int] = {} 

    def try_assign_to_same_table(person1, person2) -> bool:
        """Try to assign both people to the same table."""
        for i, capacity in enumerate(remaining_capacity):
            if capacity >= 2:
                assignment[i].extend([person1, person2])
                remaining_capacity[i] -= 2
                used_people[person1] = i
                used_people[person2] = i
                return True
        return False

    def try_assign_to_existing_table(person: str, existing_person: str) -> bool:
        """Try to assign a person to the same table as an already assigned person."""
        table_idx = used_people[existing_person]
        
        if remaining_capacity[table_idx] > 0:
            exisiting_person_index = assignment[table_idx].index(existing_person)
            if (len(assignment[table_idx]) - remaining_capacity[table_idx]) / 2 <= exisiting_person_index:
                assignment[table_idx].insert(0, person)
            else:
                assignment[table_idx].append(person)
            remaining_capacity[table_idx] -= 1
            used_people[person] = table_idx
            return True
        return False

    for (person1, person2), _ in sorted_pairs:
        if person1 in used_people and person2 in used_people:
            continue

        if person1 in used_people:
            if try_assign_to_existing_table(person2, person1):
                continue
        elif person2 in used_people:
            if try_assign_to_existing_table(person1, person2):
                continue

        if try_assign_to_same_table(person1, person2):
            continue

        for person in (person1, person2):
            if person not in used_people:
                for i, capacity in enumerate(remaining_capacity):
                    if capacity > 0:
                        assignment[i].append(person)
                        remaining_capacity[i] -= 1
                        used_people[person] = i
                        break

    return assignment
