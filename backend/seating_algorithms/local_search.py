from typing import List, Dict, Tuple
from .utils import swap_people, calculate_table_score

def improve_assignment(assignment: List[List[str]], groups: Dict[str, List[str]], 
                                weights: Dict[str, int]) -> Tuple[List[List[str]], bool]:
    """For all pairs check whether swaping them improves the score, if so swap."""
    improved = False
    new_assignment = [table.copy() for table in assignment]
    best_improvement = 0
    best_assignment = [table.copy() for table in new_assignment]
    
    for i, table1 in enumerate(new_assignment):
        for person1 in table1[:]:
            for j, table2 in enumerate(new_assignment):
                if i == j:
                    continue
                    
                for person2 in table2[:]:
                    old_score = calculate_table_score(new_assignment[i], groups, weights) \
                              + calculate_table_score(new_assignment[j], groups, weights)
                    swap_people(new_assignment, i, person1, j, person2)
                    new_score = calculate_table_score(new_assignment[i], groups, weights) \
                              + calculate_table_score(new_assignment[j], groups, weights)
                    improvement = new_score - old_score
                    
                    if improvement > best_improvement:
                        improved = True
                        best_improvement = improvement
                        best_assignment = [table.copy() for table in new_assignment]
                    
                    swap_people(new_assignment, i, person2, j, person1)
    
    return best_assignment, improved

def iteratively_improve_assignment(assignment: List[List[str]], groups: Dict[str, List[str]], 
                                  weights: Dict[str, int], max_iterations: int = 1, 
                                  ) -> Tuple[List[List[str]], int]:
    """Iteratively improve assignment until no more improvements can be made."""
    current_assignment = [table.copy() for table in assignment]
    
    for i in range(max_iterations):
        new_assignment, improved = improve_assignment(current_assignment, groups, weights)
        if not improved:
            return current_assignment, i
        current_assignment = new_assignment
    
    return current_assignment, max_iterations
