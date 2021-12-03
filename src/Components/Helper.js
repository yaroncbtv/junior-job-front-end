export class JobHelper {
    constructor() {
    }
  
    static job;
  
    static setJob(job) {
      this.job = job;
    }
  
    static getJob() {
      return this.job;
    }
  }