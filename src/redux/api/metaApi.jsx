import { baseApi } from "./baseApi";

const meta = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => {
        return {
          url: `/manage/get-faq`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getDashboardMetaData: builder.query({
      query: () => {
        return {
          url: `/meta/meta-data`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getReferral: builder.query({
      query: () => {
        return {
          url: `/referral/all-referral`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateReferralValue: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/referral/update-value/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateReferralStatus: builder.mutation({
      query: (id) => {
        return {
          url: `/referral/update-status/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAllReferral: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/referralUse/all-referral?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    getDashboardCustomerChart: builder.query({
      query: (year) => {
        return {
          url: `/meta/customer-chart-data?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getDashboardProviderChart: builder.query({
      query: (year) => {
        return {
          url: `/meta/provider-chart-data?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-faq",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/manage/delete-faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/manage/edit-faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getContact: builder.query({
      query: () => {
        return {
          url: `/contact/business-info`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getClientContact: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/contact/messages?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getExtentionReq: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/extension-request/get-all?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleExtentionReq: builder.query({
      query: ({ id }) => {
        return {
          url: `/extension-request/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),

    getSingleCancelReq: builder.query({
      query: ({ id }) => {
        return {
          url: `/cancel-request/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),

    getCancelReq: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/cancel-request/get-all?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getManagePayment: builder.query({
      query: ({ status, searchTerm, limit, page }) => {
        const params = new URLSearchParams();

        if (status !== "" && status !== undefined) {
          params.append("status", status);
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
          url: `/payment/get-all?${params.toString()}`,
          method: "GET",
        };
      },

      providesTags: ["updateProfile"],
    }),

    updateContact: builder.mutation({
      query: (data) => {
        return {
          url: `/contact/business-info`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteContactClients: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/messages/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    updateCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getCategory: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/category/all-categories?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrder: builder.query({
      query: () => {
        return {
          url: `/orders`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateOrder: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/orders/${id}/status`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addAllPromo: builder.mutation({
      query: (data) => {
        return {
          url: "/promo/create-promo",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAllPromo: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/promo/all-promo?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllPromoUse: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/promo-use/all-promo-use?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updatePromo: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/promo/update-promo/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deletePromo: builder.mutation({
      query: (id) => {
        return {
          url: `/promo/delete-promo/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    //     getUserAll: builder.query({
    //       query: ({ page, limit }) => {
    //         return {
    //           url: `/normal-user/get-all-user?page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getUserGrowth: builder.query({
    //       query: (year) => {
    //         return {
    //           url: `/meta/user-chart-data?year=${year}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getBanner: builder.query({
    //       query: ({searchTerm,page,limit}) => {
    //         return {
    //           url: `/banner/get-all?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     addBanner: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/banner/create",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //      deleteBanner: builder.mutation({
    //       query: (id) => {
    //         return {
    //           url: `/banner/delete/${id}`,
    //           method: "DELETE",
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),
    // getFaq: builder.query({
    //             query: () => {
    //                 return {
    //                     url: `/manage/get-faq`,
    //                     method: "GET",
    //                 };
    //             },
    //             providesTags: ["updateProfile"],
    //         }),

    //         addFaq: builder.mutation({
    //             query: (data) => {
    //                 return {
    //                     url: "/manage/add-faq",
    //                     method: "POST",
    //                     body: data,
    //                 };
    //             },
    //             invalidatesTags: ["updateProfile"],
    //         }),

    //         updateFaq: builder.mutation({
    //             query: ({ data, id }) => {
    //                 return {
    //                     url: `/manage/edit-faq/${id}`,
    //                     method: "PATCH",
    //                     body: data,
    //                 };
    //             },
    //             invalidatesTags: ["updateProfile"],
    //         }),

    //         deleteFaq: builder.mutation({
    //             query: (id) => {
    //                 return {
    //                     url: `/manage/delete-faq/${id}`,
    //                     method: 'DELETE'
    //                 }
    //             },
    //             invalidatesTags: ['updateProfile']
    //         }),

    getTermsConditions: builder.query({
      query: () => {
        return {
          url: "/manage/get-terms-conditions",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),
    postTermsCondition: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-terms-conditions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),

    getPrivecy: builder.query({
      query: () => {
        return {
          url: "/manage/get-privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    //     getReports: builder.query({
    //       query: ({searchTerm,page,limit}) => {
    //         return {
    //           url: `/report/all-reports?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),

    postPrivecy: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-privacy-policy",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useUpdateContactMutation,
  useGetContactQuery,
  useGetClientContactQuery,
  useDeleteContactClientsMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetPrivecyQuery,
  usePostPrivecyMutation,
  usePostTermsConditionMutation,
  useGetTermsConditionsQuery,
  useAddAllPromoMutation,
  useGetAllPromoQuery,
  useUpdatePromoMutation,
  useDeletePromoMutation,
  useGetAllPromoUseQuery,
  useGetDashboardCustomerChartQuery,
  useGetDashboardMetaDataQuery,
  useGetDashboardProviderChartQuery,
  useGetReferralQuery,
  useUpdateReferralStatusMutation,
  useUpdateReferralValueMutation,
  useGetAllReferralQuery,
  useGetExtentionReqQuery,
  useGetCancelReqQuery,
  useGetSingleExtentionReqQuery,
  useGetSingleCancelReqQuery,
  useGetManagePaymentQuery,
} = meta;
