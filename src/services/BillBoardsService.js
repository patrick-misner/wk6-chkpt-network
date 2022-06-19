import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BillBoardsService {

  async getBillBoards(){
    const res = await api.get('api/ads')
    logger.log('billboards service', res.data)
    AppState.billboards = res.data
  }

}

export const billBoardsService = new BillBoardsService()