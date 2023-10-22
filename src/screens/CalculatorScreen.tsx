import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/appTheme'
import { BotonCalc } from '../components/BotonCalc'
import { useCalculadora } from '../hooks/useCalculadora'

export const CalculatorScreen = () => {

    const {
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
    } = useCalculadora();

  return (
    <View style={ styles.calculadoraContainer }> 
        {
            ( numeroAnterior !== '0') && (
                <Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>
            )
        }
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
            <BotonCalc texto='÷' color='#FF9427' action={ btnDividir }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='7' action={ buildNumero }/>
            <BotonCalc texto='8' action={ buildNumero }/>
            <BotonCalc texto='9' action={ buildNumero }/>
            <BotonCalc texto='×' color='#FF9427' action={ btnMultiplicar }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='4' action={ buildNumero }/>
            <BotonCalc texto='5' action={ buildNumero }/>
            <BotonCalc texto='6' action={ buildNumero }/>
            <BotonCalc texto='-' color='#FF9427' action={ btnRestar }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='1' action={ buildNumero }/>
            <BotonCalc texto='2' action={ buildNumero }/>
            <BotonCalc texto='3' action={ buildNumero }/>
            <BotonCalc texto='+' color='#FF9427' action={ btnSumar }/>
        </View>

        {/* Fila de botones */}
        <View style={ styles.fila }>
            <BotonCalc texto='0' ancho action={ buildNumero }/>
            <BotonCalc texto='.' action={ buildNumero }/>
            <BotonCalc texto='=' color='#FF9427' action={ calcular }/>
        </View>
    </View>
  )
}