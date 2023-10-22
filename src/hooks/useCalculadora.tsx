import { useRef, useState } from "react"

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('0')
    
    const lastOperation = useRef<Operadores>()
    
    const clean = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }
    
    const buildNumero = (numeroTexto: string) => {
    
        if (numero.includes('.') && numeroTexto === '.') return;
        if (numero.startsWith('0') || numero.startsWith('-0')) {
            // punto decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto);
    
                // evalular si es otro cero, y hay un punto
            } else if (numeroTexto === '0' && numero.includes('.')) {
                setNumero (numero + numeroTexto);
    
                // evaluar si es diferente de cero y no tiene un punto
            } else if (numeroTexto !== '0' && !numero.includes('.')) {
                setNumero(numeroTexto);
    
                // evitar 0000.0
            } else if (numeroTexto === '0' && !numero.includes('.')) {
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto);
            }
    
        } else {
            setNumero (numero + numeroTexto)
        }
    }
    
    const positionNegative = () => {
        if (numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        } else {
            setNumero('-' + numero);
        }
    }
    
    const btnDel = () => {
        if (numero.length < 3 && numero.includes('-')) {
            setNumero('0');
        } else if (numero.length > 1) {
            const lastCharRemoved = numero.slice(0, -1);
            setNumero(lastCharRemoved);
        } else {
            setNumero('0');
        }
    }
    
    const changeNumForLastOne = () => {
        if (numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0,-1));
        } else {
            setNumeroAnterior(numero);
        }
        setNumero('0');
    }
    
    const btnDividir = () => {
        changeNumForLastOne();
        lastOperation.current = Operadores.dividir;
    }
    
    const btnMultiplicar = () => {
        changeNumForLastOne();
        lastOperation.current = Operadores.multiplicar;
    }
    
    const btnRestar = () => {
        changeNumForLastOne();
        lastOperation.current = Operadores.restar;
    }
    
    const btnSumar = () => {
        changeNumForLastOne();
        lastOperation.current = Operadores.sumar;
    }
    
    const calcular = () => {
        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );
    
        switch (lastOperation.current) {
            case Operadores.sumar:
                setNumero( `${num1 + num2}` );
                break;
    
            case Operadores.restar:
                setNumero( `${num2 - num1}` );
                break;
            
            case Operadores.multiplicar:
                setNumero( `${num1 * num2}` );
                break;
    
            case Operadores.dividir:
                setNumero( `${num2/num1}` );
                break;
        
            default:
                break;
        }
        setNumeroAnterior( '0' );
    }

    return {
        numeroAnterior,
        numero,
        clean,
        positionNegative,
        btnDel,
        btnDividir,
        buildNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    }
}
