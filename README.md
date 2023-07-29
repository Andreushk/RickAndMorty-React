# RickAndMorty-React

Решение на React (классовый подход). Решение на чистом JavaScript: https://github.com/Andreushk/RickAndMorty-JavaScript.

Для сборки необходимо использовать команду build, либо можно собрать и сразу запустить используя webpack-dev-server вызвав команду livebuild.

В ходе решения я использовал классовый подход, поскольку пока ещё учусь на курсе по React'у и функциональный подход изучается ближе к концу курса и будет уже на ближайшем занятии, а пока как раз был лишь классовый :)

В решении используется пакет "events" для создания потока событий и их обработки (шаблон "наблюдатель"). Я нахожу его весьма удобным и, хоть тут можно было обойтись и обычными callback'ами, поскольку вложенность не большая и общаются между собой не самые далёкие компоненты, я всё же использовал именно поток событий. Есть и пример использования callback'a - в компоненте App.jsx он отправляется в компонент BackToTop.jsx и возвращает сигнал обратно, когда необходимо убрать кнопку "вверх".
