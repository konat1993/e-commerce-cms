import { StoreServices } from "@/services"
import { GetStoreArgs } from "@/types/store/get"

const useGetStore = async (storeArgs: GetStoreArgs) => await StoreServices.get({ ...storeArgs })

export default useGetStore