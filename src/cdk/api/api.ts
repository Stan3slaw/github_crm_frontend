import axiosInstance from './axios-instance';
import { Project } from '@/cdk/api/types/project.types';

export const signUp = async (payload: { password: string; email: string }): Promise<void> => {
  return await axiosInstance.post('auth/sign-up', payload).then((res) => res.data);
};

export const signIn = async (payload: { email: string; password: string }): Promise<void> => {
  return axiosInstance.post('auth/sign-in', payload);
};

export const signOut = async (): Promise<void> => {
  return axiosInstance.post('auth/sign-out');
};

export const checkAuth = async (): Promise<{ isAuth: true }> => {
  return axiosInstance.get('auth/check-auth').then((res) => res.data);
};

export const getProjects = async (): Promise<Project[]> => {
  return axiosInstance.get('/project/all').then((res) => res.data);
};

export const addProject = async (payload: { url: string }): Promise<Project> => {
  return axiosInstance.post('/project', payload).then((res) => res.data);
};

export const deleteProject = async (id: string): Promise<void> => {
  return axiosInstance.delete(`/project/${id}`);
};

export const refreshProject = async (id: string, payload: { url: string }): Promise<Project> => {
  return axiosInstance.put(`/project/${id}`, payload).then((res) => res.data);
};
