class ColorsHelper
    constructor: ->
        console.info('colorConvert up and running')

    # rounds all values in color
    pacify: ( color ) ->
        safe = []
        safe.push(Math.round(part)) for part in color
        return safe

    _toHex: ( decimal ) ->
        hex = Number(decimal).toString(16)
        return "0#{hex}".slice(-2)

    _fromHex: ( hex ) -> return parseInt(hex, 16)

    hex2rgb: ( hex ) ->
        red = @_fromHex(hex[0])
        green = @_fromHex(hex[1])
        blue = @_fromHex(hex[2])

        return [ red, green, blue ]

    hex2hsl: ( hex ) ->
        red = @_fromHex(hex[0])
        green = @_fromHex(hex[1])
        blue = @_fromHex(hex[2])

        rgb = [ red, green, blue ]

        return @rgb2hsl(rgb)

    hex2hwb: ( hex ) ->
        red = @_fromHex(hex[0])
        green = @_fromHex(hex[1])
        blue = @_fromHex(hex[2])

        rgb = [ red, green, blue ]

        return @rgb2hwb(rgb)

    rgb2hex: ( rgb ) ->
        red16 = @_toHex(rgb[0])
        green16 = @_toHex(rgb[1])
        blue16 = @_toHex(rgb[2])

        hex = [ red16, green16, blue16 ]

        return hex

    rgb2hsl: ( rgb ) ->
        red = rgb[0] / 255
        green = rgb[1] / 255
        blue = rgb[2] / 255

        min = Math.min(red, green, blue)
        max = Math.max(red, green, blue)
        delta = max - min

        if max is min
            hue = 0
        else if red is max
            hue = (green - blue) / delta
        else if green is max
            hue = 2 + (blue - red) / delta
        else if blue is max
            hue = 4 + (red - green) / delta
        hue = Math.min(hue * 60, 360)
        if hue < 0 then hue += 360

        lightness = (min + max) / 2

        if max is min
            saturation = 0
        else if lightness <= 0.5
            saturation = delta / (max + min)
        else
            saturation = delta / (2 - max - min)

        return [ hue, saturation * 100, lightness * 100 ]

    rgb2hwb: ( rgb ) ->
        red = rgb[0]
        green = rgb[1]
        blue = rgb[2]

        hue = @rgb2hsl(rgb)[0]
        whiteness = 1 / 255 * Math.min(red, Math.min(green, blue))
        blackness = 1 - (1 / 255 * Math.max(red, Math.max(green, blue)))

        return [ hue, whiteness * 100, blackness * 100 ]

    hsl2hex: ( hsl ) -> return @rgb2hex(@hsl2rgb(hsl))

    hsl2rgb: ( hsl ) ->
        hue = hsl[0] / 360
        saturation = hsl[1] / 100
        lightness = hsl[2] / 100

        if saturation is 0
            val = lightness * 255
            return [ val, val, val ]

        if lightness < 0.5
            t2 = lightness * (1 + saturation)
        else
            t2 = lightness + saturation - (lightness * saturation)

        t1 = 2 * lightness - t2

        rgb = [ 0, 0, 0 ]
        i = 0
        while i < 3
            t3 = hue + 1 / 3 * -(i - 1)
            t3 < 0 and t3++
            t3 > 1 and t3--
            if 6 * t3 < 1
                val = t1 + (t2 - t1) * 6 * t3
            else if 2 * t3 < 1
                val = t2
            else if 3 * t3 < 2
                val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
            else
                val = t1
            rgb[i] = val * 255
            i += 1

        return rgb

    hsl2hwb: ( args ) -> return @rgb2hwb(@hsl2rgb(args))

    hwb2hex: ( hwb ) -> return @rgb2hex(@hwb2rgb(hwb))

    # http://dev.w3.org/csswg/css-color/#hwb-to-rgb
    hwb2rgb: ( hwb ) ->
        hue = hwb[0] / 360
        whiteness = hwb[1] / 100
        blackness = hwb[2] / 100
        ratio = whiteness + blackness

        # whiteness + blackness cant be > 1
        if ratio > 1
            whiteness /= ratio
            blackness /= ratio

        i = Math.floor(6 * hue)
        v = 1 - blackness
        f = 6 * hue - i
        if (i & 0x01) isnt 0 then f = 1 - f
        # linear interpolation
        n = whiteness + f * (v - whiteness)

        switch i
            when 6, 0
                return [ v, n, whiteness ]
            when 1
                return [ n, v, whiteness ]
            when 2
                return [ whiteness, v, n ]
            when 3
                return [ whiteness, n, v ]
            when 4
                return [ n, whiteness, v ]
            when 5
                return [ v, whiteness, n ]
            else
                console.warn("Should return proper value for #{hwb}")
                return [ 0, 0, 0 ]

    hwb2hsl: ( args ) -> return @rgb2hsl(@hwb2rgb(args))

app.colorsHelper = new ColorsHelper()
