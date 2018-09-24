import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses'

test('should render EditExpensePage correctly', ()=>{
    const editExpense = jest.fn();
    const removeExpense = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(<EditExpensePage expense={expenses[0]} editExpense={editExpense} removeExpense={removeExpense} history={history}/>)
    expect(wrapper).toMatchSnapshot();
})

test('shouls handle onSubmit in EditExpensePage', () => {
    const editExpense = jest.fn();
    const removeExpense = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(<EditExpensePage expense={expenses[0]} editExpense={editExpense} removeExpense={removeExpense} history={history}/>)
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('shouls handle onClick in EditExpensePage', () => {
    const editExpense = jest.fn();
    const removeExpense = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(<EditExpensePage expense={expenses[0]} editExpense={editExpense} removeExpense={removeExpense} history={history}/>)
    wrapper.find('button').simulate('click')
    expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[0].id});
});