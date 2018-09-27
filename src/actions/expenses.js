import uuid from 'uuid';
import  database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id:  ref.key,
        ...expense
      }));
    });
  };
};

export const startRemoveExpense = (data) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { id } = data 
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense(data));
    })
  }
}

export const startEditExpense = (id, expense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`)
    .update(expense)
    .then(() => {
      dispatch(editExpense(id, expense));
    })
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value', (snapshot) => {
      const expensesToShow = []
      snapshot.forEach((child) => {
        expensesToShow.push({
          id: child.key,
          ...child.val()
        })
      })
      dispatch(setExpenses(expensesToShow));
    });
  };
};