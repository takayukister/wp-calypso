# Tutorial: Building a Simple Tour

abtest as last selector in trigger condition

we should keep track of the tour i guess
there are tracks events for staring, quitting, and finishing tours

custom styles:

https://github.com/Automattic/wp-calypso/blob/2846567096f164c1426b223887039f79808ae612/client/layout/guided-tours/tours/theme-sheet-welcome-tour.js#L121

```JSX
<Step
	...
	style={ { marginTop: '-15px', zIndex: 1 } }
>
```

animation delay: 

https://github.com/Automattic/wp-calypso/pull/10116/files

```JSX
style={ {
	animationDelay: '10s',
	marginTop: '-8px',
	zIndex: '100000',
} }
```


translation
how to do the calls and when to add them (when copy has been reworked, also maybe after `en` a/b test)

formatting with {{strong}} etc., adding GridIcons, ...

