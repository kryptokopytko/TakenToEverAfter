import { useUser } from "../../providers/UserContext";

export const useExpenses = () => {
  const { expenseCards, setExpenseCards } = useUser();

  const addExpense = () => {
    setExpenses(prevExpenses => {
        return prevExpenses.map(expense => {
            if (expense.category.toLowerCase() === normalizedCategory) {
                const existingSubExpense = expense.subExpenses.find(
                    subExpense => subExpense.subCategory.toLowerCase() === normalizedExpenseName
                );

                if (existingSubExpense) {

                    return {
                        ...expense,
                        subExpenses: expense.subExpenses.map(subExpense =>
                            subExpense.subCategory.toLowerCase() === normalizedExpenseName
                                ? { ...subExpense, amount: expenseAmount, description: inputExpenseDescription }
                                : subExpense
                        )
                    };
                } else {

                    return {
                        ...expense,
                        subExpenses: [
                            ...expense.subExpenses,
                            { subCategory: inputExpenseName, amount: expenseAmount, description: inputExpenseDescription }
                        ]
                    };
                }
            }
            return expense;
        });
    });
}


const removeExpense = () => {
    setExpenses(prevExpenses =>
        prevExpenses
            .map(expense => {
                if (expense.category.toLowerCase() === normalizedCategory) {
                    const updatedSubExpenses = expense.subExpenses.filter(
                        subExpense => subExpense.subCategory.toLowerCase() !== inputExpenseName.toLowerCase()
                    );
                    return {
                        ...expense,
                        subExpenses: updatedSubExpenses
                    };
                }
                return expense;
            })
            .filter(expense => expense.subExpenses.length > 0)
    );
}


  return {
    addExpense,
  };
};
