declare module "datatables.net-dt/js/dataTables.dataTables";
declare module "datatables.net-dt/css/dataTables.dataTables.min.css";
declare module "datatables.net-dt";
declare module "jquery";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }

  interface JQuery {
    DataTable: any;
  }
}
