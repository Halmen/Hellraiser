function isArray(value)
{
    return hasValue(value) && value.constructor === [].constructor;
}

function isString(value)
{
    return (typeof (value) === 'string' || value instanceof String);// && value.trim() !== '';
}

function isBool(value)
{
   if (hasValue(value))
    {
        if (typeof(value) === 'boolean')
        {
            return true;
        }
        else if (typeof(value) === 'string') // Normally not needed since "true" and "false" are considered booleans in most JavaScript implementations.
        {
            if (value === 'true' || value === 'false')
            {
                return true;
            }
        }
    }
    return false;
}

function isReal(value)
{
    return !isNaN(Number(value));
//    return isInteger(value) || (value === Number(value) && value % 1 !== 0);
}

function isInteger(value)
{
    return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
}



function hasValue(value)
{
    return !(value === null || value === undefined );
}

export function isJSONObject(value)
{

    if (hasValue(value))
    {
        if (isString(value))
        {
            try
            {
                var parsed=JSON.parse(value);
                return !isArray(parsed);
                
            } catch (e)
            {
                if(value){
                   return false;
                }else{
                    
                    return true;
                }
                  
            }
        
        }
    }
    return false;


}

export function removeElement(array,value){
      var index = array.indexOf(value);
 
    if (index > -1) {
       array.splice(index, 1);
         return array;
    }else return false;
  

}


export function isArrayOfBools(value)
{
    var boolArray;
    
   if (isString(value))
    {
        try
        {
            boolArray = JSON.parse(value);
        }
        catch(e)
        
        {
                if(value){
                   return false;
                }else{
                    
                    return true;
                }
                  
            }
        
        if (!isArray(boolArray) || boolArray.length === 0)
        {
            return false;
        }
    }
    else
    {
        boolArray = value;
    }
    
    var isBoolArray = true;
    for (var i = 0; i < boolArray.length; i++)
    {
        if (!isBool(boolArray[i]))
        {
            isBoolArray = false;
            break;
        }
    }
    
    return isBoolArray;
}

export function isArrayOfReals(value)
{
    var valArray;

    try
    {
        valArray = JSON.parse(value);
    } catch (e)
    
   {
                if(value){
                    
                   return false;
                   
                }else{
                    
                    return true;
                }
                  
            }





    var isRealArray = true;

    for (var i = 0; i < valArray.length; i++)
    {
        if (!isReal(valArray[i]))
        {
            isRealArray = false;
            break;
        }
    }

    return isRealArray;
}

export function isArrayOfIntegers(value)
{
    var intArray;


    try
    {
        intArray = JSON.parse(value);
    } catch (e)
    
    {
                if(value){
                   return false;
                }else{
                    
                    return true;
                }
                  
    }




    var isIntegerArray = true;
    for (var i = 0; i < intArray.length; i++)
    {
        if (!isInteger(intArray[i]))
        {
            isIntegerArray = false;
            break;
        }
    }

    return isIntegerArray;
}

export function isArrayOfStrings(value)
{
    var stringArray;

    if (isString(value))
    {
        try
        {
            stringArray = JSON.parse(value);
        } catch (e)
        {
            {
                if(value){
                   return false;
                }else{
                    
                    return true;
                }
                  
            }
        }

        if (!isArray(stringArray) || stringArray.length === 0)
        {
            return false;
        }
    } else
    {
        stringArray = value;
    }

    var isStringArray = true;
    for (var i = 0; i < stringArray.length; i++)
    {
        if (!isString(stringArray[i]))
        {
            isStringArray = false;
            break;
        }
    }

    return isStringArray;
}

export function isArrayOfJSONObjects(value)
{
     var objArray;

    if (isString(value))
    {
        try
        {
            objArray = JSON.parse(value);
        }
        catch(e)
        {
            {
                if(value){
                   return false;
                }else{
                    
                    return true;
                }
                  
            };
        }
    
        if (!isArray(objArray) || objArray.length === 0)
        {
            return false;
        }
    }
    else
    {
        objArray = value;
    }
    
    var isJSONObjectArray = true;
    for (var i = 0; i < objArray.length; i++)
    {
        if (!JSON.stringify(isJSONObject(objArray[i]))) // Must stringify back since we have alread parsed the overall variable.
        {
            isJSONObjectArray = false;
            break;
        }
    }
    
    return isJSONObjectArray;
}

export function isArrayOfJSONArrays(value)
{
    var arrArray;
    
    if (isString(value))
    {
        try
        {
            arrArray = JSON.parse(value);
        }
        catch(e)
        {
           {
                if(value){
                   return false;
                }else{
                    return true;
                }
                  
            }
        }
    
        if (!isArray(arrArray) || arrArray.length === 0)
        {
            return false;
        }
    }
    else
    {
        arrArray = value;
    }
    
    var isJSONArrayArray = true;
    for (var i = 0; i < arrArray.length; i++)
    {
        if (!isArray(arrArray[i]))
        {
            isJSONArrayArray = false;
            break;
        }
    }
    
    return isJSONArrayArray;
}
