import express from "express";
//===================================================================================
let num = 5; //type Number
let num2: number = 10; //в первом случае тип приводится автоматически, здесь - явно

let str = "some string";
//===================================================================================
//стандартная конктинация
let strNum = num + str;
//Но если sa будет с явным типом, то конкатиниролвать таким способом уже не получится,
//нужно будет конверитировать посторонний тип
let strNum2: number = Number(str) + num;
//===================================================================================
//Массивы
let array: number[] = [1, 2, 3];
let array2: string[] = ["1", "223"];

//tuple-кортежи массивы со строгим кол-вом и типом
let tuple: [number, string] = [123, "string"];
//===================================================================================
//есть тип any которые все принимает, но его использовать не рекомендуется
let some: any = 1;
some = "str";
some = [];
//===================================================================================
//Типизация функций
function hello(arg: string): void {
  console.log(arg);
}
function sum(arg: number, arg2: number): number {
  return arg + arg2;
}
//===================================================================================
//типизация методов
array.map((i: number) => i);

//объектные типы(используются нечасто, тк в основном используют Type или Interface)
function coords(coordinates: { lat: number; lon: number }): string {
  return String(coordinates.lat) + String(coordinates.lon);
}
//===================================================================================
//UNION типы
let universalType: number | string;
universalType = 1;
universalType = "str";

function universalTypePrint(id: number | string): void {
  if (typeof id == "number") {
    console.log(id, "число");
  }
  if (typeof id == "string") {
    console.log(id.toLocaleUpperCase(), "строка");
  }
}
//===================================================================================
//Type, Interface (функции, объекты расматриваем здесь же)
//Типизация Объектов в основном приводится через interface
//type
type Coords = { lat: number; lon: number };
//interface
interface ICoords {
  //есть такая согласованность писать имена интерфейсов c I, чтобы отличать от классов
  lat: number;
  lon: number;
}
//функции + type и interface
function newCoords(coordinates: Coords): string {
  return String(coordinates.lat) + String(coordinates.lon);
}
function newCoords2(coordinates: ICoords): string {
  return String(coordinates.lat) + String(coordinates.lon);
}

//Отличия type и interface
//с type можно использовать union и любые простые типы
//с interface описивать исключительно объекты, еще другой interface может наследовать у первого
type ID = string | number;
//interface
interface IToken {
  token: number | string;
}
interface IUser extends IToken {
  name: string;
  old?: number;
}
//если повторно объявить interface, то они мерджатся
interface IUser {
  isMerged: boolean;
}
const newUser: IUser = {
  token: "123dsaadfs",
  name: "Alex",
  //old можно не писать тк он явл необязательным
  isMerged: true,
};
//type
//type тоже может наследовать типы, но не очень удобно
type Token = {
  token: number | string;
};
type Id = {
  id: number;
};
type User = Token &
  Id & {
    name: string;
    old?: number;
  };
const newUser2: User = {
  token: "asdasd2",
  id: 1,
  name: "Alex",
};
//===================================================================================
//Литеральные типы, строковые литералы
let noLitType = "str";
//В случае с let, автоматически проставляется тип
const litType = "str";
//В случае с const, тип будет равнятся значению, в данном случае тип будет "str"
const litType2: "str" = "str"; //по сути тоже самое что и выше с const
//Т.Е. в переменную можно передать только значение "str"
//Пример
type direction = "left" | "right";
function move(to: direction): void {
  console.log("moved to:", to);
}
move("left");
move("right");

const prot = {
  type: "https" as "https",
  //тут приводится тип как значение, т.е. теперь мы можем это передать в переменную которая ожидает только "https" тип
  //есть еще вариант писать как <number>123 - то же самое что 123 as number
  //лучше использовать as, понятнее и не сломает jsx  на фронте к примеру
};

interface IConnect {
  host: string;
  port: number;
}
function connect(connectionData: IConnect, protocol?: "https" | "http") {
  protocol ? console.log("set custom protocol") : console.log("set http");
  console.log("set new connection settings");
  return "new settings";
}

connect({ host: "local", port: 9000 }, prot.type);
//===================================================================================
//Enum
//Enum ведет себя как обычный объект
//Особенности - если указать какому-то свойству число, то всем последующим будут
//присвоены числовые значения которые будут увеличиваться в соответствии с позицией
//В основном enum используют как:
enum Direction {
  Left,
  Right,
  //по-умолчанию значения будут 0
  //если enum объявить через const, то знаяения свойств enum будут их свойста
}

function moveEnum(direction: Direction) {
  switch (direction) {
    case Direction.Left:
      return "left";
    case Direction.Right:
      return "right";
  }
}
moveEnum(Direction.Left);
//===================================================================================
//Generics, Дженерики
//Помогают написать функции или классы, написав меньшне кода и со своими особенностями

/*!!! Так сделать не получится тк может придти number а может вернуться string, придется писать другую функцию с другим типом, но! */
// function log(arg: string | number): string | number {
//   return arg;
// }

//Если использовать дженерики <T> - название любое
function log<T>(arg: T): T {
  console.log(arg);
  return arg;
}
log<string>("qwerty");
log<number>(123);

function log2<T, K, I>(arg: T, arg2: K, arg3: I[]): I[] {
  console.log(arg, arg2);
  return arg3;
}
log2<number, string, number[]>(12345, "string", []);
//В моменты когда TS не знает какого типа именно будет аргумент generic, нельзя писать какие-то методы - будет светить ошибку
//Для этого можно наследовать параметры для generic
interface HasLength {
  length: number;
}
function log3<T extends HasLength, K>(arg: T, arg2: K) {
  arg.length;
  console.log(arg, arg.length, arg2);
}
log3("asdf", 666);
//Еще можно использовать заранее описанные функции, к примеру
interface IFoo {
  sumall: (arg: number, arg2: number) => number;
  sumall2: <T>(arg: T) => T;
}
function sumall(arg: number, arg2: number): number {
  return arg + arg2;
}
sumall(12, 23);
function sumall2<T>(arg: T): T {
  return arg;
}
sumall2("asdf");
//===================================================================================
//class , классы
//Интерфейс для описания класса, т.е. в классе обязаны быть указанные в интерфейсе свойства и типы
interface AutoSpecs {
  _color: string;
  _engine: string;
  changeColor: (newColor: string) => void;
}
//Ключевое слово implements добавляет классу свойства интерфейса
class Auto implements AutoSpecs {
  //свойства лучше указывать как private и пользоваться только геттерами и сеттерами
  _color: string;
  _engine: string;
  //если "strictPropertyInitialization": false, то не используемые свойства будут подсвечены как ошибка
  //для устранения указываем color!: "string"
  constructor(color: string, engine: string) {
    this._color = color;
    this._engine = engine;
  }

  changeColor(newColor: string) {
    this._color = newColor;
  }

  // public changeColor(newColor: string) {
  //   this._color = newColor;
  // }
  //public то же самое, что и не писать его, т.е можно будет рспользовать метод или свойство за пределами текущего класса

  // private changeColor(newColor: string) {
  //   this._color = newColor;
  // }
  // private свойство или метод доступен только в области видимости только текущего класса

  // protected changeColor(newColor: string) {
  //   this._color = newColor;
  // }
  // protected свойство или метод доступен только в области видимости текущего класса и его детей (объектов класса)

  //В самом JS нет таких ключевых слов как private и public, фича чисто TS, поэтому после компиляции private будет #, а public пустотой

  get color() {
    return this._color;
  }
  get engine() {
    return this._engine;
  }
  set color(newColor) {
    this._color = newColor;
  }
  set engine(newEngine) {
    this._engine = newEngine;
  }
}

const haval = new Auto("silver", "v8");

class EcoAuto extends Auto {
  _isEco: boolean;
  constructor(color: string, engine: string) {
    super(color, engine); //использование свойств от родительского Класса
    //без super нельзя будет импользловать constructor в объектк класса
  }
  //override - ключевое слово чтобы переопределить метод и в родителе в тч
  override changeColor(newColor: string) {
    this._color = newColor;
  }
}

const tesla = new EcoAuto("black", "electrycity");

//Можно так же использовать дженерики для классов
class GenClass<T> {
  someVar: T;
}
const testGenClass = new GenClass<number>();

//Абстрактные классы - это описывающие базовый необходимый функционал класс,
//Вся реалтзация будет в объекте этого класса и если указать ключевое слово abstract методу или свойству, то объект класса обязан будет у себя его прописать
//ТК абстрактных классов нет в JS, то их и не будет в скомпелированном js файле
abstract class Base {
  p(str: string) {
    console.log(str);
  }
  abstract err(str: string): void;
}

class BaseExtendet extends Base {
  err(str: string): void {
    str ? console.log(str) : null;
  }
}

new BaseExtendet().p("test abstract class");
//===================================================================================
//расширенные возможности

//нередать тип другого литерала с помощью ключевого слова typeof
let a: number;
let b: typeof a;

//ключевое свово key of, позволяет получить название ключей в виде типов из type
type someKeys = {
  lat: string;
  lon: string;
};
type K = keyof someKeys;
let someKey: K;
//ничего более кроме названий ключей someKeys передать someKey будет нельзя
someKey = "lat";
someKey = "lon";

//тип null
//Тип null такой же тип как и все и при обработке можно будет учитывать и это в ТЧ
let aa: null;
//bigint, symbol
//переменной с типом bigInt естественно можно передавать только bigInt числа
//Переменные с типом Symbol можно пользоваться как уникальной единицей