import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import database from '../../../firebase/firebase'

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

const createMockStore =  configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3300,
    note: '',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${action[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
})

test('should add expense with default to database and store', () => {
  const store = createMockStore({});

  store.dispatch(startAddExpense()).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
      }
    });
    return database.ref(`expenses/${action[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    });
    done();
  });
})

test('should remove one of the expenses', (done) => {
  const store = createMockStore({});
  store.dispatch(startRemoveExpense(expenses[0])).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id : expenses[0].id
    })
    return database.ref(`expenses/${expenses[0].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should remove one of the expenses', (done) => {
  const store = createMockStore({});
  store.dispatch(startRemoveExpense(expenses[0])).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id : expenses[0].id
    })
    database.ref('expenses').once('value', (snapshot) => {
      const expt = [];
      snapshot.forEach((child) => {
        expt.push({
          id: child.key,
          ...child.val()
        })
      })
      expect(expt).toEqual([expenses[1], expenses[2]])
      done();
    });
  })
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should update one of the expensed', (done) => {
  const store = createMockStore({});
  const editedExpense = {
    description: 'Caffeina',
    note: '',
    amount: 109500,
    createdAt: 2000
  };
  
  store.dispatch(startEditExpense(expenses[1].id, editedExpense)).then(()=> {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id : expenses[1].id,
      updates: editedExpense
    })
    return database.ref(`expenses/${expenses[1].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      ...editedExpense
    })
    done();
  })
});