import {
  fetchDocument,
  fetchDocuments,
  createDocument,
  editDocument,
  deleteDocument,
} from "@/actions/documents";
import {
  QueryClient,
  QueryObserverResult,
  UseBaseMutationResult,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { Documents, AddDocument } from "@/lib/types";
import { AxiosResponse } from "axios";

export const useFetchDocuments = (): QueryObserverResult<Documents[]> => {
  return useQuery<Documents[]>({
    queryFn: async () => {
      const { data } = await fetchDocuments();
      return data;
    },
    queryKey: ["documents"],
  });
};

export const useFetchDocument = (
  id: string
): QueryObserverResult<Documents> => {
  return useQuery<Documents>({
    queryFn: async () => {
      const { data } = await fetchDocument(id);
      return data;
    },
    queryKey: ["document", id],
  });
};

export const useCreateDocument = (): UseBaseMutationResult<
  AxiosResponse<Documents>,
  unknown,
  AddDocument
> => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (data: AddDocument) => await createDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      console.error("Error adding document:", error);
    },
  });
};

export const useEditDocument = (): UseBaseMutationResult<
  AxiosResponse<Documents>,
  unknown,
  Documents
> => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (data: Documents) => await editDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      console.error("Error editing document:", error);
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      console.error("Error deleting document:", error);
    },
  });
};
