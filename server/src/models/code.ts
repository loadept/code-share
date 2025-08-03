import { Code } from '../types/code'

class CodeRoomModel {
  private static _instance: CodeRoomModel = new CodeRoomModel()
  private code: Map<string, Code>

  private constructor() {
    this.code = new Map<string, Code>()
  }

  public getCode(roomId: string) {
    return this.code.get(roomId) || { code: '', lastUpdate: '' }
  }

  public setCode(roomId: string, code: Code) {
    return this.code.set(roomId, code)
  }

  public deleteCode(roomId: string) {
    console.log('Code state completely eliminated')
    return this.code.delete(roomId)
  }

  public static get instance() {
    return this._instance
  }
}

export default CodeRoomModel
