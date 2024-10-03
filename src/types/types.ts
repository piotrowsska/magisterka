export type User = {
    id: string;
    email: string;
    name: string;
    surname: string;
    role: string;
    pesel: number;
    number: number | null;
    adress: string;
    gender: string;
    prescriptions: Prescription[];
    tests: Test[];
}

export type Prescription = {
    id: number;
    date: string;
    doctor: string;
    medicines: Medicine[];
}

export type Medicine = {
    name: number;
	dose: string;
	description: string;
	quantity: string;
}

export type Test = {
    name: string;
	date: string;
	results: Result[];
}

export type Result = {
    [key: string]: number;
}