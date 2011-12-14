class MyClass:
    def run(self, request):
        int1 = int(request.get('num1'))
        int2 = int(request.get('num2'))
        result = int1 + int2
        return result