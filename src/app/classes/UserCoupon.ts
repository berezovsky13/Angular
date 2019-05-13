export class UserCoupon {
    public constructor(
        
        public couponID?: number,
        public title?: string,
        public amount?:number,
        public price?:number,
        public startDate?:string,
        public endDate?:string,
        public message?:string,
        public image?:string,
        public type?:string,
        public companyID?:number
       
      
       ) { }
}
