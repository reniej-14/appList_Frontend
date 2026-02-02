import { isAxiosError } from "axios"
import { userSchema, type UserLoginForm } from "../types"
import api from "../lib/axios"


export const auntheticateUser = async (formData: UserLoginForm) => {
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem('LOGIN_TOKEN', data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getUser = async () => {
    try {
        const { data } = await api('/auth/user')
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}