"use client";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        // Hacer la solicitud a la API de prueba
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/test`)
            .then((res) => res.json())  // Convertir la respuesta a JSON
            .then((data) => setMessage(data.message))  // Establecer el mensaje en el estado
            .catch((error) => setMessage("Error fetching data"));  // En caso de error, mostrar mensaje
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-red-800 dark:text-red-600">
            <h1 className="text-2xl font-bold">{message || "Loading..."}</h1>
        </div>
    );
}
