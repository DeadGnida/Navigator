export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <head>
            <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript" />
        </head>
        <body>{children}</body>
        </html>
    );
}