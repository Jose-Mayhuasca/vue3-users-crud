import api from './api'

export default class UserService {
  async getUsers() {
    try {
      const response = await api.get('/users')
      return response
    } catch (error) {
      console.error('Error:', error)
      return { status: 500, data: [] }
    }
  }
}
