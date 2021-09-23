export interface Employee {
    uniqueID: number;
    name: string;
    subordinates: Employee[];
}
