interface Shoe {
	size: number;
	name: string;
}

type Age = 1 | 2;

const myAge: Age = 2;
const myShoe: Shoe = { size: 10, name: 'Airmax' };

function generateSome<T>(howMany: number): T {
	return {} as T
}

const myShoes = generateSome<Shoe>(10);
console.log(myAge, myShoe, myShoes);

// Enum example
enum Direction {
	Up = "UP",
	Down = "DOWN",
	Left = "LEFT",
	Right = "RIGHT"
}

// Generic function with constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
	return { ...obj1, ...obj2 };
}

// Utility type example
type ReadonlyPerson = Readonly<Shoe>;

// Mapped type example
type Optional<T> = {
	[K in keyof T]?: T[K];
};

const optionalShoe: Optional<Shoe> = { size: 42 };

// Decorator example
// function Log(
// 	target: any,
// 	propertyKey: string,
// 	descriptor: TypedPropertyDescriptor<any>
// ): void {
// 	const originalMethod = descriptor.value;
// 	descriptor.value = function (...args: any[]) {
// 		console.log(`Calling ${propertyKey} with`, args);
// 		return originalMethod.apply(this, args);
// 	};
// }

class Calculator {
	// Removed @Log decorator temporarily
	add(a: number, b: number): number {
		return a + b;
	}
}

const calc = new Calculator();
calc.add(2, 3);

// Advanced type example
interface Response<T> {
	data: T;
	error?: string;
}

type ApiResponse<T> = Promise<Response<T>>;

async function fetchData<T>(url: string): ApiResponse<T> {
	return { data: {} as T };
}

// Template literal types
type EventName = `on${Capitalize<string>}`;
const eventName: EventName = "onClick";

// Conditional types
type IsString<T> = T extends string ? true : false;
const isString: IsString<number> = false;

// Exported constant for testing
export const themeTest = {
	direction: Direction.Up,
	merged: merge({ a: 1 }, { b: 2 }),
	optionalShoe,
	eventName,
	isString
};
