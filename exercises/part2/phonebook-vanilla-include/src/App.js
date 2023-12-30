const App = () => {
    const persons = [
        {
            name: 'Arto Hellas',
        },
    ];

    const template = document.querySelector('template[data-component=App]').content.cloneNode(true);
    const root = document.createElement('div');
    root.appendChild(template);
    const render = () => {};
    render();
    return root;
};

export default App;
