import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({
        baseUrl : "https://server-json-data-api.herokuapp.com",
    }),
    tagTypes : ["Todos"],
    endpoints : (builder) => ({
        getTodos : builder.query({
            query : (data) => {
                let queryString='';

                if (data.colors?.length > 0) {
                    queryString += data.colors.map((color) => `color=${color}`).join("&");
                }
            
                if (data.status !== "") {
                    if(data.status === "Complete") {
                        queryString += `&completed=true`;
                    } else if(data.status === "Incomplete") {
                        queryString += `&completed=false`;
                    }
                    
                }
                return {
                url : `/todos?${queryString}`,
                method : "GET"
            }},
            providesTags: ["Todos"],
        }),
        addTodo : builder.mutation({
            query : (data) => ({
                url : "/todos",
                method : "POST",
                body : data
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo : builder.mutation({
            query : (id) => ({
                url : `/todos/${id}`,
                method : "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
        editTodo : builder.mutation({
            query : ({id,data}) => ({
                url : `/todos/${id}`,
                method : "PATCH",
                body : data
            }),
            invalidatesTags: ["Todos"],
        }),

    })
})

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation } = apiSlice;