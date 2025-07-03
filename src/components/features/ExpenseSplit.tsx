'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'

interface Expense {
  id: string
  title: string
  amount: number
  currency: string
  paidBy: string
  splitType: 'equal' | 'percentage' | 'custom'
  splitData: Record<string, number>
  participants: string[]
  date: string
  category: string
  isSettled: boolean
}

interface User {
  id: string
  name: string
  avatar?: string
  balance: number
}

export default function ExpenseSplit() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      title: 'Dinner at Italian Restaurant',
      amount: 120.00,
      currency: 'USD',
      paidBy: 'Sarah',
      splitType: 'equal',
      splitData: { 'Sarah': 20, 'Mike': 20, 'Emma': 20, 'John': 20, 'Lisa': 20, 'Alex': 20 },
      participants: ['Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'Alex'],
      date: '2024-02-15',
      category: 'Food & Dining',
      isSettled: false
    },
    {
      id: '2',
      title: 'Movie Tickets',
      amount: 45.00,
      currency: 'USD',
      paidBy: 'Mike',
      splitType: 'equal',
      splitData: { 'Sarah': 7.5, 'Mike': 7.5, 'Emma': 7.5, 'John': 7.5, 'Lisa': 7.5, 'Alex': 7.5 },
      participants: ['Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'Alex'],
      date: '2024-02-15',
      category: 'Entertainment',
      isSettled: false
    }
  ])

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Sarah', balance: -27.5 },
    { id: '2', name: 'Mike', balance: 12.5 },
    { id: '3', name: 'Emma', balance: -27.5 },
    { id: '4', name: 'John', balance: -27.5 },
    { id: '5', name: 'Lisa', balance: -27.5 },
    { id: '6', name: 'Alex', balance: -27.5 }
  ])

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
  const [isSettleUpModalOpen, setIsSettleUpModalOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Food & Dining',
    paidBy: 'You',
    participants: [] as string[],
    splitType: 'equal' as const
  })

  const addExpense = () => {
    const amount = parseFloat(newExpense.amount)
    const participants = newExpense.participants.length > 0 ? newExpense.participants : ['You', 'Sarah', 'Mike', 'Emma']
    const splitAmount = amount / participants.length
    
    const expense: Expense = {
      id: Date.now().toString(),
      title: newExpense.title,
      amount,
      currency: 'USD',
      paidBy: newExpense.paidBy,
      splitType: newExpense.splitType,
      splitData: participants.reduce((acc, participant) => {
        acc[participant] = splitAmount
        return acc
      }, {} as Record<string, number>),
      participants,
      date: new Date().toISOString().split('T')[0],
      category: newExpense.category,
      isSettled: false
    }

    setExpenses(prev => [expense, ...prev])
    
    // Update balances
    setUsers(prev => prev.map(user => {
      if (user.name === newExpense.paidBy) {
        return { ...user, balance: user.balance + amount - splitAmount }
      } else if (participants.includes(user.name)) {
        return { ...user, balance: user.balance - splitAmount }
      }
      return user
    }))

    setNewExpense({
      title: '',
      amount: '',
      category: 'Food & Dining',
      paidBy: 'You',
      participants: [],
      splitType: 'equal'
    })
    setIsAddExpenseModalOpen(false)
  }

  const settleExpense = (expenseId: string) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === expenseId ? { ...expense, isSettled: true } : expense
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Dining': return '🍽️'
      case 'Entertainment': return '🎬'
      case 'Transportation': return '🚗'
      case 'Shopping': return '🛍️'
      case 'Travel': return '✈️'
      default: return '💰'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food & Dining': return 'bg-orange-100 text-orange-800'
      case 'Entertainment': return 'bg-purple-100 text-purple-800'
      case 'Transportation': return 'bg-blue-100 text-blue-800'
      case 'Shopping': return 'bg-pink-100 text-pink-800'
      case 'Travel': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const unsettledExpenses = expenses.filter(expense => !expense.isSettled)
  const totalUnsettled = unsettledExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Expense Split</h2>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setIsSettleUpModalOpen(true)}>
            Settle Up
          </Button>
          <Button onClick={() => setIsAddExpenseModalOpen(true)}>
            Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Unsettled</p>
              <p className="text-2xl font-bold text-gray-900">${totalUnsettled.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Participants</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Balances */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Balances</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {users.map((user) => (
            <div key={user.id} className="text-center">
              <Avatar name={user.name} size="lg" className="mx-auto mb-2" />
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className={`text-sm font-semibold ${user.balance > 0 ? 'text-green-600' : user.balance < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {user.balance > 0 ? '+' : ''}${user.balance.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Expenses */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">{getCategoryIcon(expense.category)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{expense.title}</h4>
                  <p className="text-sm text-gray-500">
                    Paid by {expense.paidBy} • {expense.participants.length} people
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                  <Badge variant="default" className={getCategoryColor(expense.category)}>
                    {expense.category}
                  </Badge>
                </div>
                {!expense.isSettled ? (
                  <Button size="sm" onClick={() => settleExpense(expense.id)}>
                    Settle
                  </Button>
                ) : (
                  <Badge variant="success">Settled</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Splitwise Integration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Splitwise Integration</h3>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Sync with Splitwise</h4>
              <p className="text-sm text-gray-600">Import expenses and balances from your Splitwise groups</p>
            </div>
          </div>
          <Button variant="outline">
            Connect Splitwise
          </Button>
        </div>
      </Card>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        title="Add New Expense"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Title
            </label>
            <Input
              value={newExpense.title}
              onChange={(e) => setNewExpense(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Dinner at Italian Restaurant"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <Input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paid By
            </label>
            <select
              value={newExpense.paidBy}
              onChange={(e) => setNewExpense(prev => ({ ...prev, paidBy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Split Type
            </label>
            <select
              value={newExpense.splitType}
              onChange={(e) => setNewExpense(prev => ({ ...prev, splitType: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="equal">Split Equally</option>
              <option value="percentage">Split by Percentage</option>
              <option value="custom">Custom Split</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={addExpense} disabled={!newExpense.title.trim() || !newExpense.amount}>
              Add Expense
            </Button>
            <Button variant="outline" onClick={() => setIsAddExpenseModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Settle Up Modal */}
      <Modal
        isOpen={isSettleUpModalOpen}
        onClose={() => setIsSettleUpModalOpen(false)}
        title="Settle Up"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Here's how to settle the outstanding balances:
          </p>
          
          <div className="space-y-3">
            {users.filter(user => user.balance !== 0).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar name={user.name} size="sm" />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${user.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {user.balance > 0 ? '+' : ''}${user.balance.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.balance > 0 ? 'Owes you' : 'You owe'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={() => setIsSettleUpModalOpen(false)}>
              Mark as Settled
            </Button>
            <Button variant="outline" onClick={() => setIsSettleUpModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 