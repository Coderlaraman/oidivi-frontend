import React from 'react';

const HexGrid: React.FC = () => {
    return (
        <div className="flex flex-col items-center py-8 bg-white dark:bg-green-900">
            {/* Título o encabezado opcional */}
            <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-red-200">
                Estructura de Colmena
            </h2>

            {/* Contenedor principal */}
            <div className="space-y-4">
                {/* Fila 1 */}
                <div className="flex justify-center space-x-4">
                    <div className="hexagon" />
                    <div className="hexagon" />
                    <div className="hexagon" />
                </div>
                {/* Fila 2 (offset) */}
                <div className="flex justify-center space-x-4 ml-8">
                    <div className="hexagon" />
                    <div className="hexagon" />
                    <div className="hexagon" />
                </div>
                {/* Fila 3 */}
                <div className="flex justify-center space-x-4">
                    <div className="hexagon" />
                    <div className="hexagon" />
                    <div className="hexagon" />
                </div>
            </div>
        </div>
    );
};

export default HexGrid;
