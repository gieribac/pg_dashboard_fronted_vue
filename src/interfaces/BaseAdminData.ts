import AdminRegData from "./AdminRegData";

export default interface BaseAdminData {
        map: AdminRegData | Partial<AdminRegData>,
        messaje: string,
        status: number
}