import { baseApi } from "./baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: "/user/get-my-profile",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    getCustomerData: builder.query({
      query: ({ isBlocked, searchTerm, limit, page }) => {
        const params = new URLSearchParams();

        if (isBlocked !== "" && isBlocked !== undefined) {
          params.append("isBlocked", isBlocked);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (page) {
          params.append("page", page);
        }

        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/customer/all-customer?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


     getTaskProvider: builder.query({
      query: ({ isBlocked, searchTerm, limit, page }) => {
        const params = new URLSearchParams();

        if (isBlocked !== "" && isBlocked !== undefined) {
          params.append("isBlocked", isBlocked);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (page) {
          params.append("page", page);
        }

        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/provider/all-provider?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


  getSingleProviderUser: builder.query({
      query: ({ id }) => {
        return {
          url: `/provider/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    getSingleUser: builder.query({
      query: ({ id }) => {
        return {
          url: `/customer/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: email,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/recovery-verification",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "PUT",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/user/update-profile",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "PUT",
          body: data,
        };
      },
    }),

    blockUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/block-unblock/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),




  addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/create-admin",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/delete-admin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateAdmin: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/admin/update-admin-profile/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAdmin: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/admin/all-admins?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


updateBlockStatus: builder.mutation({
      query: ( id ) => {
        return {
          url: `/admin/update-admin-status/${id}`,
          method: "PATCH",
       
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

updateApproveStatus: builder.mutation({
      query: ( id ) => {
        return {
          url: `/user/verify-user/${id}`,
          method: "PATCH",
       
        };
      },
      invalidatesTags: ["updateProfile"],
    }),



  }),
});

export const {
  useLoginAdminMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetCustomerDataQuery,
  useBlockUserMutation,
  useGetSingleUserQuery,
  useGetTaskProviderQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useUpdateBlockStatusMutation,
  useUpdateApproveStatusMutation,
  useGetSingleProviderUserQuery
} = useApi;
