# 反射

Java反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。

在Java中，Class类与java.lang.reflect类库一起对反射技术进行了全力的支持。获取Class对象有三种方式:

- 通过实例对象获得：Class<?> class = object.getClass();
- 通过类名获得：Class<?> class = ClassName.class;
- 通过类名全路径获得：Class<?> class = Class.forName("类名全路径");

反射包中常用的类主要有

- Constructor，表示的类的构造方法信息，利用它可以在运行时动态创建对象
- Field，表示类的成员变量信息，通过它可以在运行时动态修改成员变量的属性值(包含private)
- Method，表示类的成员方法信息，通过它可以动态调用对象的方法(包含private)

下面说明一下本例中用到的一些反射api:
```java
//获得Class对象
Class clazz= obj.getClass();

//判断注解B是否在此A上
boolean isAnnotation= A.isAnnotationPresent(B.class);

//获得该clazz上的注解对象
B b=clazz.getAnnotation(B.class));

//获得本类以及父类或者父接口中所有的公共方法
Method[] methods=clazz.getMethods();

//获取方法上的所有参数
Parameter[] parameters = method.getParameters();

//执行某对象的方法,owner为该对象,paramValues为入参数组,method为Method对象
method.invoke(owner, paramValues);
```