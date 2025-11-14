
export interface PurchaseOrder {
    id: number;
    PONumber: string;
    PODate: string;
    KdSupplier: string;
    NmSupplier: string;
    ContactSupplier: string;
    AddressSupplier: string;
    KdWarehouse: string;
    NmWarehouse: string;
    AddressWH: string;
    TotalAmount: number;
    Status: string
    StatusText: string;
}

// Tipe data untuk permintaan pembuatan/pembaruan (tanpa 'id' dan 'created_at/updated_at' otomatis)
export interface PurchaseOrderCreateUpdate {
    PONumber?: string;
    PODate?: string;
    KdSupplier?: string;
    NmSupplier?: string;
    ContactSupplier?: string;
    AddressSupplier?: string;
    KdWarehouse?: string;
    NmWarehouse?: string;
    AddressWH?: string;
    TotalAmount?: number;
    Status?: string
    StatusText?: string;
}