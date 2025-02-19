// "use client";
// import { useEffect, useState } from "react";

// export default function TestPage() {
//     const [message, setMessage] = useState<string | null>(null);

//     useEffect(() => {
//         // Hacer la solicitud a la API de prueba
//         fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/test`)
//             .then((res) => res.json())  // Convertir la respuesta a JSON
//             .then((data) => setMessage(data.message))  // Establecer el mensaje en el estado
//             .catch((error) => setMessage("Error fetching data"));  // En caso de error, mostrar mensaje

//     }, []);

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-red-800 dark:text-red-600">
//             <h1 className="text-2xl font-bold">{message || "Loading..."}</h1>
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para almacenar el error

    useEffect(() => {
        // Hacer la solicitud a la API de prueba
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/test`)
            .then((res) => {
                if (!res.ok) {
                    // Si la respuesta no es exitosa, lanzar un error
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setMessage(data.message); // Establecer el mensaje en el estado
                setError(null); // Limpiar el error si la solicitud es exitosa
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Error fetching data"); // Establecer el mensaje de error
                setMessage(null); // Limpiar el mensaje si hay un error
            });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-red-800 dark:text-red-600">
            {error ? (
                <h1 className="text-2xl font-bold text-red-600">{error}</h1>
            ) : (
                <h1 className="text-2xl font-bold">{message || "Loading..."}</h1>
            )}
        </div>
    );
}