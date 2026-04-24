const isLoggedIn = localStorage.getItem("token"); // or your login flag

const API_URL =
    import.meta.env.VITE_API_URL ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : isLoggedIn
            ? ""
            : "/api");

export default API_URL;
