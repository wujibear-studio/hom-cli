import {Liquid} from 'liquidjs'

class Templates {
  public engine

  constructor() {
    this.engine = new Liquid({
      root: ['src/templates/'],
      extname: '.liquid'
    })
  }

  public async render(fileName: string, props: Object) {
    return await this.engine.renderFile(fileName, props)
  }
}

export const template = new Templates
