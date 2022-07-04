import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

//1. 박스2개 (타이틀 , 사진 , 결과값)
//2. 가위 바위 보 버튼이 있다
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
//5. 3 4의 결과를 가지고 누가 이겼는지 승패를 따진다.
//6. 승패결과에 따라 테두리 색이 바뀐다.(이기면-초록 , 지면-빨강 , 비기면 - 검정)

const choice = {
  rock: {
    name: "Rock",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgSFRUYGBgZGBkZGBwYGBkZGBgYGBgZHBwZGRkcIS4mHB4rHxocJjgmKy8xNTU3HiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrISs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NP/AABEIAMkA+wMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADoQAAICAQMDAgQFAwIGAQUAAAECABEhAxIxBEFRImEFcYGRBjJCobETwfBS0RQjYpLh8XIHFTOi4v/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHBEBAQEBAAMBAQAAAAAAAAAAAAERAiFBUTES/9oADAMBAAIRAxEAPwD2WEIQCEIQCEIQCEIQCEIQCLEiwCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQEhC4kBYRIQFhEhAWESEBYRIlwHQjbmd8R+LJpAi9zAcdh7se0DTlPW+IIvez/0i/wB+Jy2t8R1NTJNjng7fp947Sc0FYjJGRY/zgTNq46D/AO5XwAPmbP2ka/EGJNFcY47iYyaxU1ts5o7vTisHzeR9DDrldkBVwCGBNVRxe2yMWMTF6q5G4nXtdED5ydOt8gfTH0ozmV6tlCEq1kAMAQRZxWD5/v4mjoa9n1c+CcjnmXajc09dT7X5k0xa75qjxx7yx0/UndtGRXc5mpfpjThI9PVB4kk0ghCEAhCEAhCEAhCEAhCEBsIQgEIRLgLC424lwHXEuMLRC8B5aNZ5C2pOa+PfGLvTQ44cj5cX4ktEvxr44xvT0Tt4BfHnIUc/X/3MPUsHJLCvUT3Jxgf5zKocGsWAeQc57EfaXemYEjjjIHBF5Js2B7TNVINNwtooPPpv5UAaNCpOWolSBuryCt/Qc2TKuuwRk2sfV+YgnevHy98S2jbiCA1nk0c55/vJLq1cTRJ5FnF8YHjHy494dQqILZqrn/SLwB5OaH1kmk9LYstYFAE/uO1Srpa2561AExxu4ogA4NX3r/aZty4T8VXUbRusC8UfUM8nwQf595J02oC43CzVA4sCzySOeP4kfVElzVrQ7L6W/NkWQM1eOPrFekYE59k/MLGCSRjP3qJZmmeWtpdXd8kHt4z58Szp6mbHfB+1mZPSqxIPBJKnmqIv2ux/M09DWvcStXdr8j2lGhpvWS1dx7+xl5HuZLMMVdHv39iJKnUbQDn5e/tLOsMakIzT1AwsR86MiEIQCEIQCEIQCEIQGxIRLgFxCYhMQtAC0azRjPIXeBI7yF9WRPqSq+rIqv8AGfiJRdqn1Nx7DuZyaOWYgjmhYySCBfIwbv6Sb4j1hd2YAteFr51IOn6clQa9zbHNdiRwZm1UqaCFWL/pKlcGw472CMY7mO0A4G5ThmCAvYG79KnxfvGjTQEinUgrubtwCbo5GaNeZN07mjRVgH30VLAErnsQKyAfEgv6nT7h6V2sAOQMvZyPIJr7xvSJ6tpYkgn1AmiD3z4OY5Ho0vDfpz+YfoXnuBRHmP6zRTRVT1GoUciwiDc3fJzX3+kSWpWlpdVtBQi+1gnv88/5UgboWILVvvbt3ACxYJIYXx4rxIej1dLX3HQcs6j1I3pcDHqC5B+YMsKXK8r5FXkDGQRzmLz9WVGunw14UfRh3NHuP7yq7gvSg0e1g2RgEXkGT62uylUC7mc7VA4Juq4oee2JP8c19LpdMFkD6jAkLZVRVWfNce59peeUtURoMM7u3bgWPI98faaOj1O2vTtxnzdd/GBzOW+DfjRNbXHTvprps52o6M2wucBHB83Vg8zptu1mVqGQpxZNHA9qFfaLCLGtrmi1enbY845x9Y9HLKc4qxX5iKs/wce8b0zWPYHOMZBx7do5NEbgwPYg++eP5+852VqVpdF1AIBBtW4mhMLQTaxCikA9IA4/z+81+m1Nyg/QzfF+pYnhCE6MiEIQCEIQCEIQIjEJgTGsYATImeDtIHeAO8rPqQd5Vd5FOd5mfFtfalXlsfTvLhMwPjerbkH8qgfc5P7V95LVxk6jswNcDmuO/wBazJ9HWIQKq0xAvB4q6Ffz7SJOnr9QGc3we/c9zQ8yJmANFsA1dj5g57fPvMq00AD0Wy4LCsgso5P2PjiB1qYAEYo8FSS2ObqsftK+tS6lvanaLFjn8tgisk1Yi9SiqAAaJywqwoHGD33Ht2MI3fw0pbq61CSyI7AVgMWC3jBpTV+8ofjLQZOpbUe/6bhdjdsKAVvzYJr3lXS65tPVXV0iSUIsEelwfSwJ5Fjj5DxO06T8S9NqgKzbGNWmoO/s2Vb6Ga58JXFf/TvoNTV6l+sspp6e5FFfnLg2t+w2n/tnXdZSu4SxTWaoDO2/3P7S9r/GdNVrSG45ACqQoPGTjF+Jz3Tg72LMCxbeTZz9P7douIsC16rp3YYLMMcWyMqse/Jr5mSfjv4FqdTpg6OXUFStgEqSDgnF4idSiuKa2BFe+LwDfaifp9ZY6L406DbqjeAMOhXeeMMpIBYWMg58RzSqP4A/Dq6XTf8AN0a1GZt4dRuABpQDzVAH6zU+J6Y/qE2QDXAJBO0A5HHb7Sd/ji16VazxurBPkA3KrOWTLXdk+Q2bPtzxHVIh0mYbQeWJrxzX95bQUxUcWaJIyLqh9pnabYFHuc1YGZeSqBxwbr3zdf53mK0sJt3MbIFLXj5eLNiWeh1DuI7HiuLFzNJF5Nilx2Ugk8+blnon/KffPzsZ+0c0rZixITqyWEIQCEIQCEIQK5MjZorGQu0BrvK2o8e7yrqNIpmo8hJisY0wAmcp1OoHZ25Nnb/Aodz2nTazUpPgE/YThuo1M145+5masS6l2M3mv/j5BHiGiyWVOQKD5Oc5rx4+si3tuHLH9PevP9zLPS6OSrd0NNVjOcmvP8HxCFfqktgCXtGHqFkX4vvQvtRJEs9PSqNz1tUflAvIus/I8TM1tIqfXQNhVIoWAME32J714mrq6BQhP0st0GIqlBoEnsdwr3EmxcSaevtYb9IcEKzCmBJwCngDI+cerbWX1bWyw9Jzd4s8Z/mPTQUkk2fzNTG3TaCRn5Ad/vE0unLtbcX2WrBs2vnyR7wLqs7gmz6QTs7Edz5vg/4I5dX0khCzV2vORWR8x9j4hp6i3ncSMYPNUQKPuI3pkZXxR/dgL5Kdj6vr9MvSHfDNZHRGNWaJonBPPIvBi9Ro1TeQCO5yP4BHeTdMqi2Vc0SKLcgE2LOBgYi6jgENWDdYDc0cd/P2MaGqAGXINiyTfaj9e+ZcPTnBUnGCt2M8H5iZui4JJI9IFZNgGvFWDxNNdXhUzjJP1zQPyzLURAuCBnjuPUe/jJzJNTUFcAZF83jv7UZMuuCQrGs+Rms18+JE6AZGVA5+d8fec61FPouv/qJuVjtsiitEMppr82eD7TS6fXByo7//AM2foSZm9SgQK9BEAYkUNvA8cNZ/n63Oka0JS7BIH03AnPa5Ob6a6nt1KnEWM0+B8h/EfPQ5iLEiwCEIQCEIQKDtIHaSO0ruYETtKztJXaV2MikiGEQwK3XtWm5/6G/gzh9VijF28Cu544r6/vO76lbVl8qR9xOF6kgUTXBBB73R/wA+Uz0sRnVLZyGrIKsSb2ijRoGrrB7za6JwiLuB2urC6oLnJvBrjgYz4nNHWdVZVGGAUG6ZR5rzWPkJrfBHV1/puGCAHaBkIckbVHzqRUX4h+Guygq4sC80LqyKbv2HEf8Ah5dVlG4BUCnbZZixF5Nixgn+ZoJ1Log03RmJc7mPmwKvsKXi848yxoaQcrptSAswXABzQKjx2x/5kkS1oJqMrHZuzmlOCCeaP/qWjpLtJVlBq/V2BuxXsLMhbVO1lwWRgDYzVBvqAM/SRaWuGauQLxZoWP2vBqA9TuJNluV5/wBJBvnggybU1gyhtwChRYJsqcge/K/zHfDkUPeaKnddCjWcC8XwfnI+r069PAOCbz77vPI8SobodWu5RdNR9VEA2BRI/eNdz2K+o1lcknt3rmS2+3YW2jO0VVt9ZVFbwNtowF5Io+B9gc4lGt0w9dOKBWqJzfYgjGKOecyR9Mb+ALHN+RjA+fmUNPT2s2pms0Dk0PF+3ceZeTVQ07ihQAJxjb389/3kDNfT2kAtk3VjaCB4XJBAq4qt2F96wDjBr5SLqNWmA3AjgAGwBXJjv6gASwPy3YNX275/wTHXhYcXuwaOQa7EDtf+cS309/qFCj8snnHtX7yr/XQhSMgk3niuf9sSfpbYkWAKPHFA0JJYrotPgfIfxHxiHA+Qjp6GCwhCAsIkICwhCBlOZXcyZzK2oYEGoZEY7UjJFEa0dGtAicziutWnbTv9TeBiwRnzVTtHM5L8S6PrDZAI7fY39P5melikmij2HbaDYx+c4FHngHt8pB0LlXYru2IbN82TQ58gX+8i1NcG6FsFJC9yw8e8r9KjkqWFKQDxmiSSTWTiQdH/AMYHL+i9x3e1gWbHy/iWen1di/1CvIsYvbaWuPJW6r65md8P6hbKMpZVU3tsEKrCyT2+Zxg+93/iSoz0gfaVTHsBjHAr2ii50vxIsbWlJLDBslTwa844h02mVegTecis4JrPP/mZ9KCCpXc2GpSpUiheMGxRu+3vLvSuCFJotf1xR8cHdx7QjSXUZyFT07WsE+TQqzxwf8EYgXJcqrlypt7DX3Hmh2+UhfXTFOb/AFoLxm1J7V6TnyJX/olr1AgJsbiw3NbcUB37+1SK0NLXG4lgRRoNQqtv+n51zG9T1arTEkFqRiFAUFnAFkd7N+0g0tN9jAUXDG1riru7xyBUl26bqN2WU0fnfesXjj3k6pFtiqbWG/c1YVsd+LOLP8x7dau43lb/AFAEncBx4NzPZasXXOMnaauvld8eI3pnAckklcj7iufkSJYladAAsx5Ng0bHGD4JxkzO6jqsBzZoUBebJK/25/2ljqdAMiqrbqwQWHH0OeDKvU9IXHooHDcrTKc7TZwO/wA5jqe2uak6LqgX3kgBcHd+qyL2jv4v2mx0yruLL2qyDzY4P1MxF+HlipqlPqwQCG5Irxd/aanw/Ts5wSwsHtRPPkkVJJ5W/jrdL8q/IfxHwEJ6XMRYkWAQhCARYkIGM5lfUljUlbUgV3jY54yRSxjR0a0CLUmD+IemL6djlDu+Y/UPtn6Td1JU1hfyiweeu1NixVHGSt8YEYGcXTEqMhjeATkA3Lvxbpv6bsAOQNp9r/wSn0zkfmpgRVZ7ciZVc6fq62KWVKUiwLvuWr5G6l49W7IQxRmFqAAVLqSLBDfkIPAvIEzHAK4sDg1dhuzKbri+R3jdfrCrKm21ZdxwBvNgEcUe31kG8zVsYqQSAFIbDAVhhijW79uZc6daD5th+WqNkZ29rNfepk9IGP8Aywd9ZHgqQBnPI3eJo6aIwJcEWyiqsgrVEccDzJ+TBYRqUNe4rySMsjX6DQHF9/eXumUnhb59N1ZAwQT+odiZR+Ho4LpqEMCzBSFCELbDm++ZJ0/VgM2cDIFXTN44sXi/eIVc0CMqi16fuD2sd/NQZG3K6paM1seBwPUSBRyeCRf0lZersrtU7Vcb29gpA4stbd8VNDW6gbjtY0QuP0+laUjsTzXbEUN6lwlF0FEj1qCR4qqr/BGnaDtCH1ndxYIINW3+q6P1xG9d1Tun9MVe1artfpBN+PzEe0q6Tn0gsSdovPkcH2xE+It6vSqmASwUWCQvBI9JvkSxovk2tDJwOP8A4+B7e59pV1Cwzg2OAxrm6yMceTJ0okum0Cux9qyBzcnj8VYOsUQMSSSPVjuOQADZyf3lj4Md7KR+XfuB/wBQHqv+0q9Np5DEUFJqxi7BGPHb6Tf+DpY312ofyT/5l5m0rUEWIIs6siEIQFhCEAhCEDG1JXcSy4kDiBUaMkriQmRRGtFjTAjaVtSWWkGpCOf/ABD0hdCy/mUGvcdx/ecc27aCcGr9r71PRtQTk/jnw0oTqILTllrKnyvt/vJYsZ3S6+RdfPzWSD+01CNN1ZGQEWdl3YrmiO1kfzmc8Nav5Pv5Bvgy702vQ3LivUB9rth9rmRo7kX/AJirR/KFolWtr7ZBAsY9j2miu6qN7g6gncbQMbJfzhazgeR35/4Vr7UN2Czsws8eqyhPBA/2mrqdUg3aikbh8iKv6Y5P1kqw9NZt+7ccHbZvgNz+395YGrnefWBtur5ODwb/AImYnUMHayQLNePK980e80uh6xkY0BWaBK9xmicG/wCZUa3RoiLvS8/mDEYIPHF+/fmSDeNoUgpR5PqJDGxVfL7yi2ooVhtstuIAGQp2tgHvYNH3EXo3cAbWAN3Tk1Y+Q96kVo6Wsti3BLEhc0LA/KAck4BMTSHr2YZnJ5JwQQLrtwPncqHXSlOoiOA5YGzg5U1+3iQ9LVbVXIB24sAH8t3yOO/f2hF9tNzem6g5yF4FgLtJHfNduJP06bFJyAu4Ae1nAripW6HUZQ3qBNjgck8Zbjv3lxNRtwoeo8CrycUPOf7yYupeiB1thCkbyCoajgDkkH6/QeZ2PT6QRQo4A+57mUvhPQf01tgNxHA4Uf6RNKdOZiUoixBFmkEIQgEWJCAsIQgZTiQuJaZZAywKjrK7rLzpIXSBSMaZYdJCySCJpA8sMshdIFRxK2osvOkgfTgcV8c+ElAdTTW1ySufTef+3+Ji6uo5IVaAq7ItTjiqxxgiektozF+I/h1Xtk9Df/qf9pLF1zSMKUv3YXROGwKlr+vTuGRqJoE/MeoEcnt9MzO63pdXQ/8AyoRnDCypvjjvHf8AFYX8zZxXax3BOBMq1dNBbNZq8Bhd8HaPOMj6S16wNpaypo2MYBo347/K5m6WsWUtQWiAaLHPzvHB/iSP1JGzLAg3ZYndeKYA8AYz5kRs9L1ZZNyhgSSP03iqNf594p+IoCNEuVd6KAoT92xVgVz3+2WjtakNd4YA1ggk3Y4xVe8ua/XEoN+0haANZPOQebgaz9UbIUbSeVrncb7jz7SXpdZcC6HBIwBjvj5mYyh3fYo3g/l27iSTzQ5sZH8TrfhH4V1HAOt6Fwa5fjtRpfr9pUZvwzodRnIB3sTeLoCq7k0PJNczuPhHwhdIbmO5/PZR4X/fvLvRdGmkuxFCj9z7k9zLM1zzgIgiwmgsWJFgEIQgEIQgLCJFgUWEjZZORGFYFZkkbJLZWRlIFJkkbJLx04wpAz20pG2lNFtOMOnAzG0Yw6E1TpRp0oGUengOmmr/AEI5dCBl/wDCAiiAQeQRYP0lDX/CnTOdxQqf+glR/wBvH7Tpl0JMmhGDiW/Aafo1nX2IVh9aq5FrfgF2qtdCRWSjA0OBhjj5z0FdKSqkn8wef6H4Ac1v1kFG7VHJ+tsAfrNvovwToL+d31PY0q38lF/vOpVY8LGQV+k6LT0xWmioP+kAE/M8mWahUJQR0IQEEWAiwCLEiwCEIQCEIQCEIQICIhWOhAjKxpWSxpgRFIhSSwMCApE2SeJAg/pxf6cmgIEQ044aclEWBGNOPCR4jhAaFigRRFgFR0QRYBCEIBCAhAUQhFEAhCEAhCEAhCEAhCED/9k=",
  },
  scissors: {
    name: "Scissors",
    img: "https://www.ikea.com/kr/en/images/products/sy-scissors__0112301_pe263788_s5.jpg?f=s",
  },
  paper: {
    name: "Paper",
    img: "data:image/jpeg;base64,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",
  },
};
function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState(null);

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    // if (user.name === "Scissors") {
    //   if (computer.name === "Scissors") {
    //     return "Draw";
    //   } else if (computer.name === "Rock") {
    //     return "Lose";
    //   } else if (computer.name === "Paper") {
    //     return "Win";
    //   }
    // } else if (user.name === "Rock") {
    //   if (computer.name === "Scissors") {
    //     return "Win";
    //   } else if (computer.name === "Rock") {
    //     return "Draw";
    //   } else if (computer.name === "Paper") {
    //     return "Lose";
    //   }
    // } else if (user.name === "Paper") {
    //   if (computer.name === "Scissors") {
    //     return "Lose";
    //   } else if (computer.name === "Rock") {
    //     return "Win";
    //   } else if (computer.name === "Paper") {
    //     return "Draw";
    //   }
    // }

    //위의 코드를 삼항연산자로 바꿈
    if (user.name === computer.name) {
      return "Draw";
    } else if (user.name === "Rock") {
      return computer.name === "Scissors" ? "Win" : "Lose";
    } else if (user.name === "Scissors") {
      return computer.name === "Paper" ? "Win" : "Lose";
    } else if (user.name === "Paper") {
      return computer.name === "Rock" ? "Win" : "Lose";
    }
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 array로 만들어주는 함수
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  return (
    <>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box
          title="Computer"
          item={computerSelect}
          result={
            result == "Win"
              ? "Lose"
              : "Draw" && result == "Lose"
              ? "Win"
              : "Draw"
          }
        />
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </>
  );
}

export default App;
