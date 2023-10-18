import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/appTheme'
import { BotonCalc } from '../components/BotonCalc'

export const CalculatorScreen = () => {

const [numeroAnterior, setNumeroAnterior] = useState('0')
const [numero, setNumero] = useState('0')

const clean = () => {
    setNumero('0')
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

  return (
    <View style={ styles.calculadoraContainer }>
        <Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>
        <Text style={ 
            styles.resultado }
            numberOfLines={ 1 }
            adjustsFontSizeToFit={ true }
            >{ numero }
        </Text>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='C' color='#9B9B9B' action={ clean }/>
            <BotonCalc texto='+/-' color='#9B9B9B' action={ positionNegative }/>
            <BotonCalc texto='del' color='#9B9B9B' action={ btnDel }/>
            <BotonCalc texto='÷' color='#FF9427' action={ clean }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='7' action={ buildNumero }/>
            <BotonCalc texto='8' action={ buildNumero }/>
            <BotonCalc texto='9' action={ buildNumero }/>
            <BotonCalc texto='×' color='#FF9427' action={ clean }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='4' action={ buildNumero }/>
            <BotonCalc texto='5' action={ buildNumero }/>
            <BotonCalc texto='6' action={ buildNumero }/>
            <BotonCalc texto='/' color='#FF9427' action={ clean }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='1' action={ buildNumero }/>
            <BotonCalc texto='2' action={ buildNumero }/>
            <BotonCalc texto='3' action={ buildNumero }/>
            <BotonCalc texto='+' color='#FF9427' action={ clean }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='0' ancho action={ buildNumero }/>
            <BotonCalc texto='.' action={ buildNumero }/>
            <BotonCalc texto='=' color='#FF9427' action={ clean }/>
        </View>
    </View>
  )
}