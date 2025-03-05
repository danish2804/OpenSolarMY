def calculate_pv_sizing(E_crit, mu_batt, v_sdc, t_psh):
    """
    Calculate the required array maximum-power current (in A) .

    Parameters:
    E_crit: Daily electrical-energy consumption during critical design month
            (in Wh/day)
    mu_batt: battery-system charging efficiency
    v_sdc: nominal DC system voltage (in V)
    n_m: Number of Modules in Array
    t_psh:  peak sun hours for critical design month (in hr/day)

    Returns:
    I_arr: required array maximum-power current
    """
    I_arr = E_crit/(mu_batt * v_sdc * t_psh)
    return I_arr

def array_rated_ouput(I_arr,c_s):
    '''
    Array Rated Output. Just as with battery
    banks, certain factors reduce the array output
    from the factory ratings to actual output values.
    Therefore, these factors are applied to the re¬
    quired array output to determine the necessary
    increase in array ratings for sizing and module
    selection.


    Cs :soiling derating factor
    I_arr: required array maximum-power  current (in A)
    :return:
    '''
    i_rated=I_arr/c_s
    return i_rated

def rated_array_max_powerV(nominal_dc_voltage ,
                           temp_coeff_voltage ,
                           max_module_temp,
                           reference_temp):
    """
     Calculate the rated array maximum-power voltage after considering temperature effects.

     Parameters:
     nominal_dc_voltage: Nominal DC-system voltage (in V)
     temp_coeff_voltage: Temperature coefficient for voltage (in /°C)
     max_module_temp: Maximum module temperature in Celsius
     reference_temp: Reference temperature in Celsius

     Returns:
     rated_max_power_voltage: Rated array maximum-power voltage (in V)
     """
    temp_diff=max_module_temp-reference_temp
    var_x=nominal_dc_voltage * temp_coeff_voltage * temp_diff
    rated_max_power_voltage=1.2 * (nominal_dc_voltage + var_x)
    return rated_max_power_voltage


