import axios, { AxiosResponse } from "axios";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import type { UseQueryOptions, UseMutationOptions } from "react-query";
import { fetchUser } from "../../helpers/fetches";

function fetchTodos() {
  return axios.get("http://localhost:8080/todos", {
    withCredentials: true,
  });
}

function updateTodo({ todoId, todo }: { todoId: number; todo: any }) {
  return axios.patch(
    `http://localhost:8080/todos/${todoId}`,
    {
      todo: todo,
    },
    { withCredentials: true }
  );
}

function deleteTodo({ todoId }: { todoId: number }) {
  return axios.delete(`http://localhost:8080/todos/${todoId}`, {
    withCredentials: true,
  });
}

function addTodo({ todo }: { todo: any }) {
  return axios.post(
    "http://localhost:8080/todos",
    { todo },
    { withCredentials: true }
  );
}

// Hooks
export function useTodos(
  options?:
    | Omit<
        UseQueryOptions<
          AxiosResponse<any, any>,
          unknown,
          AxiosResponse<any, any>,
          "todos"
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) {
  return useQuery("todos", fetchTodos, options);
}

export function useTodoUpdate(
  options?:
    | Omit<
        UseMutationOptions<
          AxiosResponse<any, any>,
          unknown,
          { todoId: number; todo: any },
          unknown
        >,
        "mutationFn"
      >
    | undefined
) {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
}

export function useTodoDelete(
  options?:
    | Omit<
        UseMutationOptions<
          AxiosResponse<any, any>,
          unknown,
          { todoId: number },
          unknown
        >,
        "mutationFn"
      >
    | undefined
) {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
}

export function useTodoPost(
  options?:
    | Omit<
        UseMutationOptions<
          AxiosResponse<any, any>,
          unknown,
          { todo: any },
          unknown
        >,
        "mutationFn"
      >
    | undefined
) {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
}

export function useUser(
  options?:
    | Omit<
        UseQueryOptions<
          AxiosResponse<any, any>,
          unknown,
          AxiosResponse<any, any>,
          "user"
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) {
  return useQuery("user", fetchUser, options);
}
