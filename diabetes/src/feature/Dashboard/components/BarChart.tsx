import { Text, VStack } from '@chakra-ui/react';
import { THEME_COLORS } from '@shangrila-cargo/theme/colors';
import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartLegend } from './ChartLegend';
import { ChartTooltip } from './ChartTooltip';

interface BarChartData {
  name: string;
  Low: number;
  Medium: number;
  High: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
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
        Age Group Risk Categories
      </Text>
      <ResponsiveContainer minWidth={'100%'} minHeight="446px">
        <RechartsBarChart
          width={500}
          height={300}
          data={data}
          barCategoryGap="20%" // Adjusts the gap between categories
          barGap={5} // Adjusts the gap between bars within a category
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            content={<ChartTooltip />}
          />
          <Legend
            align="left"
            verticalAlign="top"
            layout="horizontal"
            fontFamily="Satoshi"
            fontSize="14px"
            wrapperStyle={{ paddingBottom: 40 }}
            content={<ChartLegend />}
          />
          <XAxis
            type="category"
            dataKey="name"
            fontFamily="Satoshi"
            fontSize={'16px'}
            axisLine={false}
            tickMargin={16}
            tick={{
              fill: THEME_COLORS.gray[500],
              fontSize: 16,
              fontWeight: 500,
            }}
          />
          <YAxis
            type="number"
            fontFamily="Satoshi"
            fontSize={'16px'}
            axisLine={false}
            tick={{
              dx: -10,
              fill: THEME_COLORS.gray[500],
              fontSize: 16,
              fontWeight: 500,
            }}
          />
          <Bar
            dataKey="Low"
            barSize={52}
            fill={THEME_COLORS.primary[600]}
            radius={[4, 4, 0, 0]}
            activeBar={{ stroke: THEME_COLORS.primary[600], strokeWidth: 2 }}
          />
          <Bar
            dataKey="Medium"
            barSize={52}
            fill={THEME_COLORS.yellow[500]}
            radius={[4, 4, 0, 0]}
            activeBar={{ stroke: THEME_COLORS.yellow[500], strokeWidth: 2 }}
          />
          <Bar
            dataKey="High"
            barSize={52}
            fill={THEME_COLORS.red[500]}
            radius={[4, 4, 0, 0]}
            activeBar={{ stroke: THEME_COLORS.red[500], strokeWidth: 2 }}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </VStack>
  );
};

export default BarChart;
