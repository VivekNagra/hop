import { Text, VStack } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
type RiskData = {
  name: string;
  value: number;
};

interface RiskPieChartProps {
  data: RiskData[];
}

const RiskPieChart: React.FC<RiskPieChartProps> = ({ data }) => {
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  return (
    <VStack
      rounded={'xl'}
      alignItems={'flex-start'}
      border={'1px solid'}
      borderColor={'gray.100'}
      rowGap={5}
      px={7}
      py={5}
    >
      <Text variant={'md_semibold'} ms={-1}>
        Risk Categories
      </Text>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </VStack>
  );
};

export default RiskPieChart;
