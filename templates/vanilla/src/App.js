const App = () => {
    const root = document.createElement('div');
    const render = () => {
        root.textContent = 'Hello, world!';
    };
    render();
    return root;
};

export default App;
