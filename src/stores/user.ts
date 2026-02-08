import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUser } from '@/interfaces/User'
import UserService from '@/services/UserService'

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const userService = new UserService()
  const lastId = ref<number>(0)

  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await userService.getUsers()
      if (response.status === 200) {
        users.value = response.data
        lastId.value = users.value.length > 0 ? Math.max(...users.value.map((u) => u.id)) : 0
      } else {
        error.value = 'Error fetching users'
      }
    } catch (e) {
      error.value = 'Error connection'
    } finally {
      isLoading.value = false
    }
  }

  const addUser = (userData: Omit<IUser, 'id'>) => {
    lastId.value++
    const newUser: IUser = {
      id: lastId.value,
      ...userData,
    }

    users.value.push(newUser)
  }

  const updateUser = (updatedUser: IUser) => {
    const index = users.value.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = { ...updatedUser }
    }
  }

  const removeUser = (id: number) => {
    const index = users.value.findIndex((u) => u.id === id)
    users.value.splice(index, 1)
  }

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    removeUser,
  }
})
